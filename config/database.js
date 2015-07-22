// config/database.js
module.exports = {
    'database' : 'test',
    'username' : 'root',
    'password' : '',
    'options'  : {
        'host' : 'localhost',
        'dialect' : 'mysql',
        'pool' : {
            'max' : 5,
            'min' : 0,
            'idle' : 1000
        }
    }
};
