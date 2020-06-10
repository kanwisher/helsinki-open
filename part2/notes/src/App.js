import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = () => {
const [notes, setNotes] = useState([])
const [noteContent, setNoteContent ] = useState('')
const [showAll, setShowAll ] = useState(true)
const [message, setMessage ] = useState(null)

useEffect(() => {
  noteService.getAll()
  .then((data)=> setNotes(data))
}, []);

const addNote = (e) => {
  e.preventDefault();
  const newNote = {
    important: Math.random() < 0.5,
    content: noteContent,
    date: new Date().toISOString()
  }

  noteService.create(newNote)
    .then(data => {
      setNotes([...notes, data])
      setNoteContent('')  
    })
}

const toggleImportance = (id) => {
  const note = notes.find((note) => note.id === id);
  const updatedNote = { ...note, important: !note.important };
  noteService.update(id, updatedNote)
  .then(data => {
    setNotes(notes.map((note) => note.id !== id ? note : data))
  }).catch(error => {
    setMessage(
      `Note '${note.content}' was already removed from server`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })
}

const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App