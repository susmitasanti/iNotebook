const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require("../middleware/fetchuser")
const { validationResult, body } = require('express-validator');



// ROUTE 1: Get all notes of a logged in user using GET: "/api/auth/fetchallnotes".
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user});
        if (notes) {
            res.json(notes)
        }
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal Server Error.");
    }
}
);

// ROUTE 2: Add a new note using POST: "/api/auth/addnote". Login required.
router.post('/addnote', [
    body('title').notEmpty(),
    body('description').notEmpty()
], fetchuser, async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            user = await Notes.create({
                user: req.user,
                title: req.body.title,
                description: req.body.description,
                tag:req.body.tag
            })
            res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(400).send("Internal Server Error.");
        }
    }
    else 
    {
        res.send({ errors: result.array() });

    }
}
);

module.exports = router