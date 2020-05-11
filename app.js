// Requires
var express = require('express');
var bodyParser = require('body-parser');

// inicializar variables
var app = express();

// añadiendo las tablas
const db = require("./models");
// db.sequelize.sync();
// elimina y crea la tablas
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuarios');
var loginRoutes = require('./routes/login');
var usuarioFBRoutes = require('./routes/user-firebase');
var servicioRoutes = require('./routes/servicio');
var tipouserRoutes = require('./routes/tipouser');
var tutorialRoutes = require('./routes/tutorial');

// Rutas (Middleware)
app.use('/', appRoutes);
app.use('/user', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/userfb', usuarioFBRoutes);
app.use('/servicio', servicioRoutes);
app.use('/tipouser', tipouserRoutes);
app.use('/tutorial', tutorialRoutes);

// Escuchar peticion (puerto)
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});