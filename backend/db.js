const mongoose = require('mongoose');
const mongoURI ="mongodb://127.0.0.1:27017/inotebook"
//mongodb://localhost:27017
//mongodb://127.0.0.1/test

const connectToMongo = async () => {
   await mongoose.connect(mongoURI, await console.log("Connected to mongo `Successful")
       );
}

module.exports=connectToMongo;