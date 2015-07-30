var bcrypt = require('../controllers/bcrypt.js');

function _hashPassword(instance, options, callback) {
    if(!instance.changed('password')) return callback();
    bcrypt.hash(instance.password, function(err, hash){
        if(err) return callback(err);
        instance.password = hash;
        callback();
    });
}

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Utente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING(),
        password: DataTypes.STRING(),
        email: DataTypes.STRING()
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'Utenti',
        name: { plural: 'Utenti', singular: 'Utente' },
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            }
        ],

        hooks: {
            beforeUpdate: _hashPassword,
            beforeCreate: _hashPassword
        },

        //classMethods: {
        //    //Impostare qui di seguito le funzioni generiche per la classe User
        //    generateHash: function(password) {
        //        return bcrypt.hashSync(password);
        //    }
        //},
        instanceMethods: {
            verifyPassword: function(password, callback) {
                bcrypt.compare(password, this.password, function(err, isMatch) {
                    if (err) return cb(err);
                    callback(null, isMatch);
                });
            },
            getToken: function() {
                var tmp = this.getOggettoClient();
                return tmp.token;
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
