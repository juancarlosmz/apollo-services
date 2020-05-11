module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
        id_firebase: Sequelize.STRING,
        fecha_nacimiento: Sequelize.DATE,
        sexo: Sequelize.STRING,
        tipouserId: {
            type: Sequelize.INTEGER,
            ref: {
                model: 'tipouserId',
                key: 'id',
            }
        },
        servicioId: {
            type: Sequelize.INTEGER,
            ref: {
                model: 'servicioId',
                key: 'id',
            }
        }
    });
    return user;
};