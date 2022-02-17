const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const schemaUser = new Schema({
  nombre: {
    type: String,
    required: [true, 'Nombre requerido']
  },
  correo: {
    type: String,
    required: [true, 'Correo requerido']
  },
  contrasenia: {
    type: String,
    required: [true, 'Contraseña requerida']
  },
  estado: {
    type: Boolean,
    default: true,
  }
})

schemaUser.plugin(uniqueValidator)


module.exports = mongoose.model('User', schemaUser)