import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = event => {
    const { name, number } = event;
    const loweredCase = name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${name} is already in contacts!`);
    } else {
      setContacts([...contacts, { id: nanoid(), name, number }]);
    }
  };

  const addFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = () => {
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    if ('contacts' in localStorage) {
      const storedContacts = localStorage.getItem('contacts');
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <section>
      <div className="content__container">
        <ContactForm addContact={addContact} />
        <ContactList
          contacts={filteredContacts()}
          deleteContact={deleteContact}
        >
          <Filter filter={filter} addFilter={addFilter} />
        </ContactList>
      </div>
    </section>
  );
};

export default App;
