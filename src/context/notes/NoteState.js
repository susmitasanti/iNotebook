import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get All Notes:
  const getNotes = async () => {
    const url = "http://localhost:5000/api/notes/fetchallnotes"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MDQ0MjlmZGE5MjBkYzdhNGZkMWUwIiwiaWF0IjoxNjg5ODI4NDE0fQ.7OjdiziF5LcMa0p7-WCGtZX6qsYbF9AondhwDe9gTDY'
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a Note:
  const addNote = async (title, description, tag) => {

    const url = `http://localhost:5000/api/notes/addnote`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MDQ0MjlmZGE5MjBkYzdhNGZkMWUwIiwiaWF0IjoxNjg5ODI4NDE0fQ.7OjdiziF5LcMa0p7-WCGtZX6qsYbF9AondhwDe9gTDY'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    console.log("Adding a new Note")
    const note = {
      "_id": "64820558013fcf3e4de23dfdfdf4157",
      "user": "64804429fda920dc7a4fd1e0",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-08T16:44:08.315Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete a Note:
  const deleteNote = async (id) => {
    console.log("Deleting note with id" + id)
    //notes.filter((note)=>{return notes._id!==id}) this line will remove all the notes whose _id==id and keep notes whose _id!==id
    const url = `http://localhost:5000/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MDQ0MjlmZGE5MjBkYzdhNGZkMWUwIiwiaWF0IjoxNjg5ODI4NDE0fQ.7OjdiziF5LcMa0p7-WCGtZX6qsYbF9AondhwDe9gTDY'
      },
    });
    const json = await response.json();
    const newNotes = await notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note:
  const editNote = async (id, title, description, tag) => {
    const url = `http://localhost:5000/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MDQ0MjlmZGE5MjBkYzdhNGZkMWUwIiwiaWF0IjoxNjg5ODI4NDE0fQ.7OjdiziF5LcMa0p7-WCGtZX6qsYbF9AondhwDe9gTDY'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;