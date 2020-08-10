import React from 'react'
import phonebookService from '../services/phonebook'



const PersonForm = ({ newName, newPhone, setNewName, setNewPhone, persons, setPersons, setMessage }) => {

  const addPerson = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim();
    const existingUser = persons.find(({ name }) => name.toLowerCase() === trimmedName.toLowerCase())
    if (!trimmedName || !newPhone) {
      return setMessage({content: `All fields are required`, type: "error"})
    }
    const newContact = {
      name: trimmedName,
      number: newPhone
    }

    setNewName('')
    setNewPhone('')
    if (existingUser) {
      const replaceNumber = window.confirm(`${existingUser.name} is already added to phonebook, replace the old number with a new one?`)
      if (replaceNumber) {
        const updatedUser = { ...existingUser, number: newPhone }
        phonebookService.update(existingUser.id, updatedUser).then((data) => {
          console.log(data)
          setPersons(persons.map((person) => person.id !== existingUser.id ? person : data))
        })
        setMessage({content: `Updated ${newContact.name}'s phone number`, type: "success"})
        setTimeout(() => setMessage(null), 2000)
      }
    } else {
     phonebookService.create(newContact).then(data => setPersons([...persons, data]));
     setMessage({content: `Added ${newContact.name}`, type: "success"})
     setTimeout(() => setMessage(null), 2000)
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