import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
const [notes, setNotes] = useState([])
const [noteContent, setNoteContent ] = useState('')
const [showAll, setShowAll ] = useState(true)

useEffect(() => {
  noteService.getAll()
  .then((data)=> setNotes(data))
}, []);

const addNote = (e) => {
  e.preventDefault();
  const newNote = {
    important: Math.random() < 0.5,
    content: newNote,
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
  })
}

const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
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