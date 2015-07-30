module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Prova', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descrizione: DataTypes.STRING(),
        quantita: DataTypes.INTEGER
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'Prove',
        name: { plural: 'Prove', singular: 'Prova' }
    })
}
