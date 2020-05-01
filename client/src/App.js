import React, { Component } from 'react';
import Card from './component/Card';
import axios from 'axios'
import './App.css';
import AddContact from './component/Addcard';

class App extends Component {
  state = {
    contacts: [],
    show: false,
  };
  handleShow = () => {
    this.setState({ show: !this.state.show});
  };
  componentDidMount() {
    this.getAllContacts();
  }
  getAllContacts = () =>
    axios.get('/contacts').then((res) => {
      this.setState({
        contacts: res.data,
      });
    });
  handleAdd = (newContact) =>
    axios.post('/add_contact', newContact).then(this.getAllContacts());

  handleDelete = (id) =>
    axios.delete(`/deleted_contact/${id}`).then(this.getAllContacts());
  handleEdit = (contact) =>
    axios .put(`/edit_contacts/${contact.id}`, {
        name: contact.name,
       email: contact.email,
        tel: contact.tel,
      }).then(this.getAllContacts());
  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h1>
            <span style={{ color: '#ff9f43' }}>Con</span>
            <span style={{ color: '#0abde3' }}>ta</span>
            <span style={{ color: '#ee5253' }}>ct-</span>
            <span style={{ color: '#00d2d3' }}>Li</span>
            <span style={{ color: '#5f27cd' }}>st</span>
          </h1>
        </div>
        <AddContact
          show={this.state.show}
          handleShow={this.handleShow}
          handleAdd={this.handleAdd}
        />
        <div className='w'>
          {this.state.contacts.map((el, i) => (
            <Card
              key={i}
              person={el}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
