module.exports = (sequelize, Sequelize) => {
    const servicio = sequelize.define('servicio', {
        descripcion: Sequelize.STRING
    });

    return servicio;
};