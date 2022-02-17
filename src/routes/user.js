const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/model.user')

const app = express()

app.get('/listar', (req, res) => {
  User.find({ estado: true },(error, usuarios) => {

    if (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 500,
        message: 'Ocurrió un error al listar los usuarios'
      })
    }

    return res.json({
      status: 200,
      usuarios
    })

  })
})

app.get('/listar/:id', (req, res) => {

  const { id } = req.params

  User.findById(id, (error, usuario) => {

    if (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 500,
        message: 'Ocurrió un error al listar los usuario'
      })
    }

    return res.json({
      status: 200,
      usuario
    })

  })
})

app.post('/crear', (req, res) => {

  const { nombre, correo, contrasenia, estado } = req.body

  const user = new User({
    nombre,
    correo,
    contrasenia: bcrypt.hashSync(contrasenia, 10),
    estado,
  })

  user.save((error, usuarioNuevo) => {
    if (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 500,
        message: 'Ocurrió un error al crear el usuario'
      })
    }

    return res.json({
      status: 200,
      usuarioNuevo
    })
  })
})

app.put('/actualizar/:id', (req, res) => {
  const { id } = req.params
  const { nombre, correo } = req.body
  User.findByIdAndUpdate(id, { nombre, correo },
    (err, usuarioActualizado) => {
      if (err){
        console.log('error: ', error);
        return res.status(500).json({
          status: 500,
          message: 'Ocurrió un error al actualizar el usuario'
        })
      }
      return res.json({
        status: 200,
        usuario: usuarioActualizado
      })
  });
})

app.put('/suspender/:id', (req, res) => {
  const { id } = req.params
  const { estado } = req.body
  User.findByIdAndUpdate(id, { estado },
    (err, usuarioActualizado) => {
      if (err){
        console.log('error: ', error);
        return res.status(500).json({
          status: 500,
          message: 'Ocurrió un error al actualizar el usuario'
        })
      }
      return res.json({
        status: 200,
        usuario: usuarioActualizado
      })
  });
})

app.delete('/eliminar/:id', (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      console.log('error: ', error);
        return res.status(500).json({
          status: 500,
          message: 'Ocurrió un error al eliminar el usuario'
        })
    }

    return res.json({
      status: 200,
      message: 'El usuario ' + id + ' se eliminó'
    })
  })
})

module.exports = app