const connectToMongo=require('./db');
var cors = require('cors')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

//Available routes:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))
app.get('/login', (req, res) => {
  res.send('Hello Sushh!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
