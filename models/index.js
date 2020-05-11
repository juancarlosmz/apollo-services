// app a la bs mysql
var dbConfig = require('../conexion/server/conexion');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
/* db.tutorials = require("./user.js")(sequelize, Sequelize);
db.tutorials = require("./usuario.js")(sequelize, Sequelize); */
var tipouser = require("./tipouser.js")(sequelize, Sequelize);
var servicio = require("./servicio.js")(sequelize, Sequelize);
var usuario = require("./usuario.js")(sequelize, Sequelize);
var deposito = require("./deposito.js")(sequelize, Sequelize);
var cuentabancaria = require("./cuentabancaria.js")(sequelize, Sequelize);
/* tipouser.hasMany(usuario);
servicio.hasMany(usuario);
usuario.hasMany(deposito);
usuario.hasMany(cuentabancaria); */

tipouser.hasMany(usuario, { foreignKey: 'tipouserId' });
servicio.hasMany(usuario, { foreignKey: 'servicioId' });
usuario.belongsTo(tipouser, { foreignKey: 'tipouserId' });
usuario.belongsTo(servicio, { foreignKey: 'servicioId' });

db.tipouser = tipouser;
db.user = usuario;
db.servicio = servicio;
module.exports = db;