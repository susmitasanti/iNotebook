const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult, body } = require('express-validator');

//Create a User using: POST "/api/auth/createUser". No login required 
// router.post('/',query('person').notEmpty(), (req, res) =>{
//     const user = User(req.body);
//     // user.save()
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       return res.send(`Hello, ${req.query.person}!`);
//     }

//     res.send({ errors: result.array() });
//     // res.send(req.body)
//     // console.log(req.body)

// })

router.post('/createUser', [
    body('name', "Enter a valid Name").notEmpty(),
    body('email', "Enter a valid EmailId").notEmpty().isEmail(),
    body('password', "Enter a valid Password").notEmpty().isStrongPassword()
], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) 
    {
        // const user = User(req.body);
        // user.save()
        // console.log(req.body)

        //Yaha we used try catch because incase in future, any error occurs(u neve know), tho bhi there is a mechanism to display the error nicely.

        try {
            //This line checks if the user alreadys exists in the database
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                //if user exists, it returns Bad Request and displays this error message.
                return res.status(400).json({ error: "An user with this email already exists." })
            }
            else {
                //if user does not exist, it will create a new User
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })

                res.json(user)
            }

            //    .then(user => res.json(user))
            //       .catch(err => {console.log(err)
            //     res.json({error:"Please enter a unique Email Id"})
            //         });
            
        } catch (error) 
        {
            console.log(error.message);
            res.status(500).json({ error: "Some error occurred" })
        }
    }
    else 
    {
        res.send({ errors: result.array() });

    }
}

)



module.exports = router