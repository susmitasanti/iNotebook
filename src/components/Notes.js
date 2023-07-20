import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

function Notes() {
    const context = useContext(noteContext)
    const { notes, getNotes } = context

    useEffect(()=>{
        getNotes()
    }, [])
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    //    return note.title
                    return <NoteItem key={note._id} notes={note} />
                })}
            </div>
        </>
    )
}

export default Notes
