const mongoose = require('mongoose');

// const mongoURI ="mongodb+srv://susmita:Susmita%402004@cluster0.ws45801.mongodb.net/inotebook"
//mongodb://localhost:27017
//mongodb://127.0.0.1/test

const connectToMongo = async () => {
   await mongoose.connect(process.env.DATABASE_URI, await console.log("Connected to mongo `Successful")
       );
}

module.exports=connectToMongo;