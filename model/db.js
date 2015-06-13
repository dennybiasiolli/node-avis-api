var db = {};

var Sequelize = require("sequelize");
var sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

db.Sezione = sequelize.import(__dirname + "/Sezione");
db.StatoDonatore = sequelize.import(__dirname + "/StatoDonatore");
db.TipoDonazione = sequelize.import(__dirname + "/TipoDonazione");
db.Donatore = sequelize.import(__dirname + "/Donatore");
db.Donazione = sequelize.import(__dirname + "/Donazione");

db.Donatore.belongsTo(db.Sezione, {foreignKey: 'Sezione_id'});
db.Sezione.hasMany(db.Donatore, {foreignKey: 'Sezione_id'});

db.Donatore.belongsTo(db.StatoDonatore, {foreignKey: 'StatoDonatore_id'});
db.StatoDonatore.hasMany(db.Donatore, {foreignKey: 'StatoDonatore_id'});

db.Donatore.hasMany(db.Donazione, {foreignKey: 'Donatore_id'});
db.Donazione.belongsTo(db.Donatore, {foreignKey: 'Donatore_id'});

db.TipoDonazione.hasMany(db.Donazione, {foreignKey: 'Donatore_id'});
db.Donazione.belongsTo(db.TipoDonazione, {foreignKey: 'Donatore_id'});

//Sezione.belongsTo(Donatore);
//StatoDonatore.belongsTo(Donatore);
//Donazione.belongsTo(Donatore);
//Donatore.hasMany(Donazione);
//TipoDonazione.belongsTo(Donazione);

//primo initialize del database, una volta completato commentare queste istruzioni altrimenti lo fa sempre e spiana tutti i dati
if(false){
    sequelize.sync({force: true}).then(function () {
        // Tables created
        db.Sezione.create({
            id: 1,
            Descrizione: 'AVIS SAVIGLIANO',
            Indirizzo: 'VIA TORINO 105/107',
            Cap: '12038',
            Comune: 'SAVIGLIANO',
            Provincia: 'CN',
            Tel: '0172 31527',
            Fax: '0172 31527',
            Email: 'avis.savi@hotmail.it'
        }).then(function(t1) {
            console.log(t1.get('id') + ' ' + t1.get('Descrizione'));
        });

        db.StatoDonatore.create({
            id: 1, Descrizione: 'Attivo', DescrizioneEstesa: 'Attivo', Attivo: true
        }).then(function(t1) {
            console.log(t1.get('id') + ' ' + t1.get('Descrizione'));
        });
        db.StatoDonatore.create({
            id: 2, Descrizione: 'SEM', DescrizioneEstesa: 'Socio Emerito', Attivo: false
        }).then(function(t1) {
            console.log(t1.get('id') + ' ' + t1.get('Descrizione'));
        });
        db.StatoDonatore.create({
            id: 3, Descrizione: 'SSO', DescrizioneEstesa: 'Socio Sostenitore', Attivo: false
        }).then(function(t1) {
            console.log(t1.get('id') + ' ' + t1.get('Descrizione'));
        });


        db.Donatore.create({
            Cognome: 'Biasiolli', Nome: 'Denny'
        }).then(function(t1) {
            console.log(t1.get('id') + ' ' + t1.get('Cognome') + ' ' + t1.get('Nome'));
            db.Donatore.findById(t1.get('id')).then(function(donatore){
                donatore.addDonazione(db.Donazione.build({DataDonazione: new Date()})).then(function(t2){
                    db.Donatore.findAll({ include: [ db.Donazione ] }).then(function(donatori) {
                        console.log(JSON.stringify(donatori));
                        //console.log((donatori));
                    });
                });
            });
        });
    });
}
else{
    //Donatore.findAll({ include: [ Donazione ] }).then(function(donatori) {
    //    console.log(JSON.stringify(donatori));
    //    //console.log((donatori));
    //});
    db.StatoDonatore.findAll({ include: [ db.Donatore ] }).then(function(statoDonatore) {
        console.log(JSON.stringify(statoDonatore));
    });
}

module.exports = db;