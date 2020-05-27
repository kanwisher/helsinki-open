import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.trim().toLowerCase()))

  return (
    <ul>
      {filteredPersons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

export default Persons