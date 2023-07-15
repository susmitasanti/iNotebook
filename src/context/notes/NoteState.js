import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
   const notesInitial=[
    {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Hullo",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Hehe",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Tchtch",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Hehe",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Tchtch",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Hehe",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
      {
        "_id": "64820558013fcf3ede23d415",
        "user": "64804429fda920dc7a4fd1e0",
        "title": "Tchtch",
        "description": "Wake up early",
        "tag": "Personal",
        "date": "2023-06-08T16:44:08.315Z",
        "__v": 0
      },
   ]
   const [notes, setNotes] = useState(notesInitial)

   
    return(
    <noteContext.Provider value= {{notes, setNotes}}>
        {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;