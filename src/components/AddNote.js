import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
  const context = useContext(noteContext)
  const {addNote} = context

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag)
  }

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })

  }
  return (
    <div>
      <div className='container my-3'>
        <h2>Add a Note</h2>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter your Note's title" onChange={onChange} name="title" />
        </div>

        <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" placeholder="Enter your Note's Tag" onChange={onChange} name="tag" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description</label>
          <textarea className="form-control" id="description" placeholder="Enter your Note's Description" rows="3" onChange={onChange} name="description"></textarea>
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button><br />
      </div>
    </div>
  )
}

export default AddNote
