// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var connection = require('../conexion/server/conexion');
var SEED = require('../config/config').SEED;

// inicializar variables
var app = express();

// ==================================================
// Crear un nuevo Usuario
// ==================================================
app.post('/', (req, res) => {
    var email = 'admin1@gmail.com';
    var passwd = 'admin1master';
    connection.query('SELECT id,firstname,lastname,email,rol,passwd FROM user where status = 0 and email = ?', email, function(error, results) {
        if (bcrypt.compareSync(passwd, results[0].passwd)) {
            //crear un token
            results[0].passwd = ':)';
            var token = jwt.sign({
                id: results[0].id,
                firstname: results[0].firstname,
                lastname: results[0].lastname,
                email: results[0].email,
                rol: results[0].rol,
            }, SEED, { expiresIn: 36000 }); // 24 horas
            return res.status(200).json({
                mensaje: 'Credenciales corectas',
                token: token,
            });
        }
    });
});

module.exports = app;