import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(({data}) => {
      setPersons(data);
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
        <PersonForm 
          newPhone={newPhone}
          newName={newName}
          setNewName={setNewName}
          setNewPhone={setNewPhone}
          persons={persons}
          setPersons={setPersons}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App