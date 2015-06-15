module.exports = function(sequelize, DataTypes) {
    return sequelize.define('StatoDonatore', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descrizione: DataTypes.STRING,
        DescrizioneEstesa: DataTypes.STRING,
        Attivo: DataTypes.BOOLEAN
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        name: { plural: 'StatiDonatore', singular: 'StatoDonatore' },
        indexes: [ // Create a unique index on email
            {
                unique: true,
                fields: ['Descrizione']
            }
        ]
    })
}
