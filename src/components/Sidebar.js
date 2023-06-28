import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4>{note.body.split('\n')[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))
    return(
        <div className="pane sidebar">
            <div className="sidebar--header">
                <h1>Notes</h1>
                <button onClick={props.newNote} className="add-btn">+</button>
            </div>
            {noteElements}
        </div>
    )
}