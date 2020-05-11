module.exports = (sequelize, Sequelize) => {
    const tipouser = sequelize.define('tipouser', {
        descripcion: Sequelize.STRING
    });
    return tipouser;
};