import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, deleteClicked }) => {
const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.trim().toLowerCase()))

  return (
    <ul>
      {filteredPersons.length ?
        filteredPersons.map(person => <Person key={person.name} person={person} deleteClicked={deleteClicked} />)
        : 'Add your first user!'}
    </ul>
  )
}

export default Persons