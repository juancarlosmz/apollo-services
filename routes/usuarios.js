// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var connection = require('../conexion/server/conexion');
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');

// inicializar variables
var app = express();

// ==================================================
// Obtener todos los Usuario
// ==================================================
app.get('/', (req, res, next) => {
    connection.query('SELECT id,firstname,lastname,email,rol FROM user where status = 0', function(error, results) {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error no se encontraron usuarios',
                errors: error
            });
        } else {
            return res.status(200).json({
                ok: true,
                usuarios: results
            });
        }
    });
});

// ==================================================
// Actualizar un Usuario
// ==================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    // encriptar password
    var encrypted = bcrypt.hashSync('123466', 10);
    connection.query('UPDATE user SET passwd = ? where id = ?', [encrypted, id], function(error, results, fields) {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error actualizando usuario',
                errors: error
            });
        } else {
            return res.status(200).json({
                ok: true,
                body: 'actualizado'
            });
        }
    });
});

// ==================================================
// Crear un nuevo Usuario
// ==================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    // date
    var dateFormat = require('dateformat');
    var now = new Date();
    var today = dateFormat(now, "isoDateTime");
    // encriptar password
    var encrypted = bcrypt.hashSync('admin1master', 10);
    var post = { firstname: 'admin1', lastname: 'admin1', email: 'admin1@gmail.com', passwd: encrypted, rol: 1, status: 0, created_at: today, updated_at: today };
    connection.query('INSERT INTO user SET ?', post, function(error, results, fields) {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error registrando usuario',
                errors: error
            });
        } else {
            return res.status(200).json({
                ok: true,
                body: 'registrado',
                usuariotoken: req.usuario
            });
        }
    });
});

// ==================================================
// Eliminar un Usuario
// ==================================================
app.put('/delete/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    connection.query('UPDATE user SET status = 1 where id = ?', [id], function(error, results, fields) {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar usuario',
                errors: error
            });
        } else {
            return res.status(200).json({
                ok: true,
                body: 'eliminado'
            });
        }
    });
});

module.exports = app;