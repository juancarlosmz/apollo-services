// Requires
var express = require('express');
const models = require("../models");

// inicializar variables
var app = express();

// ==================================================
// Obtener todos los Usuario
// ==================================================


app.get('/', (req, res, next) => {

    models.user.findAll({ include: [{ model: models.tipouser, }, { model: models.servicio, }, ] })
        .then(data => {
            models.user.count().then(counts => {
                res.send({
                    ok: true,
                    users: data,
                    total: counts,
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

});

// ==================================================
// Crear usuarios
// ==================================================
app.post('/', (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const objeto = {
        id_firebase: req.body.id_firebase,
        fecha_nacimiento: req.body.fecha_nacimiento,
        sexo: req.body.sexo,
        tipouserId: req.body.tipouserId,
        servicioId: req.body.servicioId,
    };
    // Save Tutorial in the database
    models.user.create(objeto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
});

module.exports = app;