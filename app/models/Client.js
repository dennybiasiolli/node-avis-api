//var bcrypt = require('../controllers/bcrypt.js');

//function _hashPassword(instance, options, callback) {
//    if(!instance.changed('password')) return callback();
//    bcrypt.hash(instance.password, function(err, hash){
//        if(err) return callback(err);
//        instance.password = hash;
//        callback();
//    });
//}

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Client', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(),
        id: DataTypes.STRING(),
        secret: DataTypes.STRING()
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'Clients',
        name: { plural: 'Clients', singular: 'Client' },
        //indexes: [
        //    {
        //        unique: true,
        //        fields: ['name']
        //    }
        //],
        //hooks: {
        //    beforeUpdate: _hashPassword,
        //    beforeCreate: _hashPassword
        //},
        //classMethods: {
        //    //Impostare qui di seguito le funzioni generiche per la classe User
        //    generateHash: function(password) {
        //        return bcrypt.hashSync(password);
        //    }
        //},
        //instanceMethods: {
        //    verifyPassword: function(password, callback) {
        //        bcrypt.compare(password, this.password, function(err, isMatch) {
        //            if (err) return cb(err);
        //            callback(null, isMatch);
        //        });
        //    }
        //}
    })
}
