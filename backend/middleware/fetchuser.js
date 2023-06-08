const jwt = require('jsonwebtoken');
const JWT_SECRET = "Sushh@2004";


const fetchuser =  (req, res, next) => {
    //Get the user from the jwt token and add Id to request object
    const token = req.header("auth-token")
    if (token) {
        try {
            //.verify() returns the decoded token 
            var data = jwt.verify(token, JWT_SECRET)
            console.log(data)
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate using a valid token." });
        }
    }
    else {
        res.status(401).send({ error: "Please authenticate using a valid token." });
    }
  
    
}


module.exports = fetchuser
