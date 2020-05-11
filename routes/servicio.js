// Requires
var express = require('express');
const models = require("../models");

// inicializar variables
var app = express();

// ==================================================
// Obtener todos los Usuario
// ==================================================
app.get('/', (req, res, next) => {
    models.servicio.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
});

// ==================================================
// Crear nuevo
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
        descripcion: req.body.descripcion,
    };
    // Save Tutorial in the database
    models.servicio.create(objeto)
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