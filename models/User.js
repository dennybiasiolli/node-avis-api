module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING(),
        password: DataTypes.STRING(),
        email: DataTypes.STRING(),
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'Users',
        name: { plural: 'Users', singular: 'User' },
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['id']
            }
        ]
    })
}
