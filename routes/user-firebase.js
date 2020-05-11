// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var connection = require('../conexion/server/conexion');
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');
var admin = require('firebase-admin');
/* var firebase = require('firebase');
require("firebase/auth");
require("firebase/firestore"); */

// inicializar variables
var app = express();

// inicializando firebase 1

var serviceAccount = require("../expertify-3b3d4-firebase-adminsdk-l30jf-1e53428b24.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://expertify-3b3d4.firebaseio.com/'
});

var db = admin.database();


// inicializando firebase 2

/* var serviceAccount = require("../expertify-3b3d4-firebase-adminsdk-l30jf-1e53428b24.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://expertify-3b3d4.firebaseio.com/'
});

var db = firebase.database(); */


// ==================================================
// Obtener los Usuario de fire base
// ==================================================
app.get('/', (req, res, next) => {
    db.ref('users').once('value', (snapshot) => {
        var data = snapshot.val();
        res.status(200).json({
            ok: true,
            users: data
        });
    });
});

// ==================================================
// Crear un nuevo Usuario Firebase
// ==================================================
app.post('/new-user', mdAutenticacion.verificaToken, (req, res) => {
    //
    var newUser = {
        name: req.body.name,
        notificationTokens: req.body.notificationTokens,
        phone: req.body.phone,
        photo: req.body.photo,
        status: req.body.status,
        thumblmg: req.body.thumblmg,
        ver: req.body.ver,
    };
    db.ref('users').push(newUser);
    res.send('received');
});

// ==================================================
// Eliminar un Usuario firebase
// ==================================================
app.put('/delete-user/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    console.log(id);
});

module.exports = app;