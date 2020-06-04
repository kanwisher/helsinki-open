import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, deleteClicked }) => {
const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.trim().toLowerCase()))

  return (
    <ul>
      {filteredPersons.map(person => <Person key={person.name} person={person} deleteClicked={deleteClicked} />)}
    </ul>
  )
}

export default Persons