module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Sezione', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descrizione: DataTypes.STRING,
        Indirizzo: DataTypes.STRING,
        Frazione: DataTypes.STRING,
        Cap: DataTypes.STRING(5),
        Comune: DataTypes.STRING,
        Provincia: DataTypes.STRING,
        Tel: DataTypes.STRING,
        Fax: DataTypes.STRING,
        Email: DataTypes.STRING
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        name: { plural: 'Sezioni', singular: 'Sezione' },
        indexes: [ // Create a unique index on email
            {
                unique: true,
                fields: ['Descrizione']
            }
        ]
    })
}
