const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const { validationResult, body } = require('express-validator');



// ROUTE 1: Get all notes of a logged in user using GET: "/api/auth/fetchallnotes".
// router.post('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Notes.find({ user: req.user });
//         if (notes) {
//             // const userInfo=await User.find({ _id: req.user });
//             res.json(notes)
//         }
//     } catch (error) {
//         console.error(error.message)
//         res.status(400).send("Internal Server Error.");
//     }
// }
// );

router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user });
        if (notes) {
            res.json(notes)
        }
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal Server Error.");
    }
});

// ROUTE 2: Add a new note using POST: "/api/auth/addnote". Login required.
router.post('/addnote', [
    body('title').notEmpty(),
    body('description').notEmpty()
], fetchuser, async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const user = await Notes.create({
                user: req.user,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            })
            res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(400).send("Internal Server Error.");
        }
    }
    else {
        res.send({ errors: result.array() });

    }
}
);

//ROUTE 3: Update an existing note using PUT: "api/auth/updatenote/id". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
try
   { //Create a newNote object
    const newNote = {};
    if (req.body.title) {
        newNote.title = req.body.title
    }
    if (req.body.description) {
        newNote.description = req.body.description;
    }
    if (req.body.tag) {
        newNote.tag = req.body.tag;
    }

    //req.params.id is the id mentioned in api
    //Find the note to be updated and update it.
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).send("Note not found");
    }
    //If the note's userId == id of the user who has requested to update, only then the note can be updated.
    if (note.user != req.user) {
        //401: Unauthorized user.
        res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //SYNTAX FOR UPDATING
    res.json(note)
}catch (error) {
    console.error(error.message)
    res.status(400).send("Internal Server Error.");
}
});

//ROUTE 4: Delete an existing note using DELETE: "api/auth/deletenote/id". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {//req.params.id is the id mentioned in api
        //Find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Note not found");
        }
        //If the note's userId == id of the user who has requested to delete, only then the note can be deleted.
        else if (note.user != req.user) {
            //401: Unauthorized user.
            res.status(401).send("Not allowed");
        }
        else {
            note = await Notes.findByIdAndDelete(req.params.id) //SYNTAX FOR UPDATING
            res.json({ "Success": "Note has been deleted", note: note });
        }
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal Server Error.");
    }
})


module.exports = router