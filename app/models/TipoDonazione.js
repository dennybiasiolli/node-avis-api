module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TipoDonazione', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descrizione: DataTypes.STRING
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        name: { plural: 'TipiDonazione', singular: 'TipoDonazione' },
        indexes: [ // Create a unique index on email
            {
                unique: true,
                fields: ['Descrizione']
            }
        ]
    })
}
