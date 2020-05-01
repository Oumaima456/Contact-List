const express = require('express');
const assert = require('assert');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
app.use(express.json());

//Connecting to our database
const mongoURI =
  'mongodb+srv://Oumaima:123@cluster0-kynyr.mongodb.net/test?retryWrites=true&w=majority';
const dataBase = 'list-contact';

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, 'connection to database failed');

  const db = client.db(dataBase);
  app.post('/add_contact', (req, res) => {
    let newContact = req.body;
    db.collection('contacts').insertOne(newContact, (err, data) => {
      err ? console.log('cannot add contact') : res.send(data);
    })

})
app.get("/contacts",(req,res)=>{
db.collection("contacts").find().toArray((err,data)=>{
    err?console.log('cannot find contact'):res.send(data);
})

})
app.put("/edit_contacts/:id",(req,res)=>{
    let edited=ObjectID(req.params.id);
   
    db.collection("contacts").findOneAndUpdate({_id:edited},{$set:req.body},(err,data)=>{
err?console.log('cannot edit contact'):console.log('contact edited!')
    })
})

app.delete("/deleted_contact/:id",(req,res)=>{
    let deleted=ObjectID(req.params.id);
    db.collection("contacts").findOneAndDelete({_id:deleted},(err,data)=>{
        err?console.log('cannot delete contact'):console.log('contact deleted!')

})
})


})






const port=process.env.port||5000
app.listen(port,err=>err?console.log('erreur!'):console.log("serveur is running in port 5000")
    )