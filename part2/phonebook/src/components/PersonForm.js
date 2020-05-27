import React from 'react'



const PersonForm = ({ newName, newPhone, setNewName, setNewPhone, persons, setPersons }) => {

  const addPerson = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim();
    const nameExists = persons.find(({ name }) => name.toLowerCase() === trimmedName.toLowerCase())
    const newPerson = {
      name: trimmedName,
      phone: newPhone
    }

    setNewName('')
    if (nameExists) {
      return alert(`${nameExists.name} exists already`)
    }
    setPersons([...persons, newPerson])
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