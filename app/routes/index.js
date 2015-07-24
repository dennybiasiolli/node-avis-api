module.exports = function(app, passport) {
    app.use('/api', require('./api')(passport));
};