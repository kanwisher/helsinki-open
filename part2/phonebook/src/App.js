import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((data) => setPersons(data))
  }, [])

  const deleteClicked = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      phonebookService.destroy(id).then((data) => {
        console.log(data);
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({content: `Deleted user`, type: "success"})
        setTimeout(() => setMessage(null), 2000)
      }).catch((data) => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({content: `User was already deleted.`, type: "error"})
        setTimeout(() => setMessage(null), 2000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter filter={filter} setFilter={setFilter} />
        <PersonForm 
          newPhone={newPhone}
          newName={newName}
          setNewName={setNewName}
          setNewPhone={setNewPhone}
          persons={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} deleteClicked={deleteClicked}/>
    </div>
  )
}

export default App