const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 3000 || process.env.PORT
const routes = require('./routes')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => console.log('Connection Succeeded!'))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
