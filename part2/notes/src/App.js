import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'


const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote ] = useState('')
const [showAll, setShowAll ] = useState(true)

useEffect(() => {
  axios
  .get('http://localhost:3001/notes')
  .then((res)=> setNotes(res.data))
}, []);

const addNote = (e) => {
  e.preventDefault();
  const Note = {
    id: notes.length + 1,
    important: Math.random() < 0.5,
    content: newNote,
    date: new Date().toISOString()
  }
  setNotes([...notes, Note])
  setNewNote('')
}

const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'all' : 'important'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App