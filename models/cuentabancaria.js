module.exports = (sequelize, Sequelize) => {
    const cuentabancaria = sequelize.define('cuentabancaria', {
        numero: Sequelize.STRING,
        banco: Sequelize.STRING,
        userId: {
            type: Sequelize.INTEGER,
            ref: {
                model: 'user',
                key: 'id',
            }
        }
    });
    return cuentabancaria;
};