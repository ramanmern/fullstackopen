import { useState, useEffect } from "react"
import axios from 'axios'
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('fulfilled');
      setNotes(response.data)
    })
  }, [])
  console.log('render', notes.length, 'notes');

  const handleAddNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <form onSubmit={handleAddNote}>
        <input type="text" value={newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App