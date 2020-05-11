module.exports = (sequelize, Sequelize) => {
    const deposito = sequelize.define('deposito', {
        fecha_deposito: Sequelize.DATE,
        total: Sequelize.STRING,
        userId: {
            type: Sequelize.INTEGER,
            ref: {
                model: 'user',
                key: 'id',
            }
        }
    });
    return deposito;
};