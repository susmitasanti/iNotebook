import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { Navigate, useNavigate } from 'react-router-dom'

function Notes() {
    const context = useContext(noteContext)
    const { notes, getNotes, addNote, editNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    let navigate=useNavigate()


    const ref = useRef(null)
    const refClose=useRef(null)
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote(currentNote)
    }


    const handleClick = (event) => {
        event.preventDefault();
        console.log("Updating Note...", note)
        refClose.current.click();
        editNote(note._id, note.title, note.description, note.tag)
        getNotes()
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })

    }
    return (
        <>
            <AddNote />

            <button style={{'display': 'none'}}ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className='container my-3'>
                                    <div className="mb-3 my-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" placeholder="Enter your Note's title" onChange={onChange} name="title" value={note.title}/>
                                    </div>

                                    <div className="mb-3 my-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" placeholder="Enter your Note's Tag" onChange={onChange} name="tag" value={note.tag}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label" >Description</label>
                                        <textarea className="form-control" id="description" placeholder="Enter your Note's Description" rows="3" onChange={onChange} name="description" value={note.description}></textarea>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title<5 || note.description<5 || note.tag<5 ? true: false} type="submit" className="btn btn-primary" onClick={handleClick}>Edit</button><br />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    //    return note.title
                    return <NoteItem key={note._id} updateNote={updateNote} notes={note} />
                })}
            </div>
        </>
    )
}

export default Notes
