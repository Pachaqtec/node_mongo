const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(morgan('dev'))
app.use(cors())

app.use('/user', require('./src/routes/user'))

app.get('/', (req, res) => {
  res.send('<h1>403</h1>')
})


mongoose.connect(process.env.URL_CONECTION_MONGO, (error) => {
  if (error) throw new error

  console.log('MongoDB contectado')
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})