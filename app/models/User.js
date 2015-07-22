

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
        idOld: DataTypes.INTEGER
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
        ],

        classMethods: {
            //Impostare qui di seguito le funzioni generiche per la classe User
            generateHash: function(password) {
                var bcrypt = require('bcrypt-nodejs');
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
        },
        instanceMethods: {
            //Impostare qui di seguito le funzioni di istanza per il singolo User
            validPassword: function(password) {
                var bcrypt = require('bcrypt-nodejs');
                return bcrypt.compareSync(password, this.password);
            },
            getOggettoClient: function() {
                var jwt = require('./../controllers/jsonwebtoken');
                var retData = {
                    id: this.id,
                    username: this.username,
                    email: this.email
                };
                retData.token = jwt.my_sign(retData);
                return retData;
            }
        }
    })
}
