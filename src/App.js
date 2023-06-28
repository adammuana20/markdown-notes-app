import React, { useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { data } from "./data"
import { nanoid } from "nanoid"
import "react-mde/lib/styles/css/react-mde-all.css";

export default function App() {

  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  )

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter((note) => note.id !== noteId))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const updateArr = []

      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId) {
          updateArr.unshift({...oldNote, body: text})
        } else {
          updateArr.push(oldNote)
        }
      }
      return updateArr
    })

    // THIS DO NOT PUT THE UPDATED NOTE TO THE TOP
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //   return oldNote.id === currentNoteId
    //     ? {...oldNote, body: text}
    //     : oldNote
    // }))
  }

  return (
    <div className="App">
      { 
        notes.length > 0
        ?
        <Split
          sizes={[30,70]}
          direction="horizontal"
          className="split"
          minSize={[155, 20]}
          expandToMin="true"
        >
          <Sidebar 
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor 
            currentNote={findCurrentNote()}
            updateNote={updateNote}
          />
        </Split>
        :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button
            className="first-note"
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>
      }
    </div>
  );
}

