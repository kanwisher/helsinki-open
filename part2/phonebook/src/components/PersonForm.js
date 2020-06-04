import React from 'react'
import phonebookService from '../services/phonebook'



const PersonForm = ({ newName, newPhone, setNewName, setNewPhone, persons, setPersons }) => {

  const addPerson = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim();
    const existingUser = persons.find(({ name }) => name.toLowerCase() === trimmedName.toLowerCase())
    const newPerson = {
      name: trimmedName,
      phone: newPhone
    }

    setNewName('')
    if (existingUser) {
      const replaceNumber = window.confirm(`${existingUser.name} is already added to phonebook, replace the old number with a new one?`)
      if (replaceNumber) {
        const updatedUser = { ...existingUser, phone: newPhone }
        phonebookService.update(existingUser.id, updatedUser).then((data) => setPersons(persons.map((person) => person.id !== existingUser.id ? person : data)))
      }
    } else {
     phonebookService.create(newPerson).then(data => setPersons([...persons, data]))
    }
  }

  return (
    <form>
      <div>
        name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        phone: <input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

export default PersonForm