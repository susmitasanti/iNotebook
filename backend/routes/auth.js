const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Sushh@2004";



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

//ROUTE 1 : Create a User using: POST "/api/auth/createUser". No login required 
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

        //Yaha we used try catch because incase in future, any error occurs(u never know), tho bhi there is a mechanism to display the error nicely.

        try {

            const salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(req.body.password, salt); 

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
                    password: secPass,
                })

                //This line will store user's id in object:data
                data={
                    user: user.Id
                };
                //This creates a token for the user
                const token = jwt.sign(data, JWT_SECRET);

                res.json({authtoken: token})
            }

            //    .then(user => res.json(user))
            //       .catch(err => {console.log(err)
            //     res.json({error:"Please enter a unique Email Id"})
            //         });
            
        } catch (error) 
        {
            console.log(error.message);
            res.status(500).send("Internal Server Error")
        }
    }
    else 
    {
        res.send({ errors: result.array() });

    }
}
);

//ROUTE 2 : Login a User using: POST "/api/auth/login".
router.post('/login', [
    body('email', "Enter a valid EmailId").notEmpty().isEmail(),
    body('password', "Enter your Password").notEmpty().isStrongPassword()
], async (req, res) =>{
    const result = validationResult(req);
    if (result.isEmpty()) 
    {
    try
        {
            //Checks if the user exists in the database
            let user = await User.findOne({email:req.body.email})
        if(user)
        {
            //Compares the given password with the password in the database
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            //If password matches...
            if(passwordCompare)
            {
                //stores user's id in the object:data
                data={
                    user: user._id
                };
                //creates the token
                const token = jwt.sign(data, JWT_SECRET);

                res.json({authtoken: token});
            }
            else
            {
                res.status(400).json({error:"Please enter correct credentials."});

            }
        }
        else
        {
            res.status(400).json({error:"Please enter correct credentials."});
        }
        }
        catch(error){
            res.status(400).send("Internal Server Error.");
        }
    }
    else 
    {
        res.send({ errors: result.array() });

    }

}
);

//Now..after generating authoken for the logged in user..we will try to extract user's Id from the authtoken, using which we will fetch the user's data.

// ROUTE 3 : Get logged in user's details. Login required. using POST "/api/auth/getUser".
router.post('/getUser', fetchuser, async (req, res) =>{
try{
    userId=req.user;
    const user = await User.findOne({_id:userId}).select("-password");
    if(user){
        res.send(user)
    }

}catch(error){
    console.error(error.message)
    res.status(400).send("Internal Server Error.");
}
}
);
module.exports = router