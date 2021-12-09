import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "../ContactForm/ContactForm.jsx";
import Filter from "../Filter/Filter.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = (name, number) => {
    const contactName = { name, number, id: shortid.generate() };
    const normalizedName = name.toLowerCase();
    const duplicateName = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (duplicateName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (name === "") {
      alert(`Please type your info in the field. It is empty.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contactName],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  updateFilter = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <>
        <div className={s.container}>
          <h1 className={s.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addNewContact} />
          <h2 className={s.title}>Contacts</h2>
          <Filter filter={filter} onChange={this.updateFilter} />
          <ContactList
            contacts={filteredContacts}
            onClick={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
