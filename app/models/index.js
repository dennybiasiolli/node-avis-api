var db = {};

var configDB = require('./../../config/database.js');

var Sequelize = require("sequelize");
var sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, configDB.options);

db.Utente = sequelize.import(__dirname + "/Utente");

db.Prova = sequelize.import(__dirname + "/Prova");
db.Prova.belongsTo(db.Utente, {foreignKey: 'Utente_id'});
db.Utente.hasMany(db.Prova, {foreignKey: 'Utente_id'});

db.Client = sequelize.import(__dirname + "/Client");
db.Client.belongsTo(db.Utente, {foreignKey: 'Utente_id'});
db.Utente.hasMany(db.Client, {foreignKey: 'Utente_id'});

db.Code = sequelize.import(__dirname + "/Code");
db.Code.belongsTo(db.Utente, {foreignKey: 'Utente_id'});
db.Utente.hasMany(db.Code, {foreignKey: 'Utente_id'});
db.Code.belongsTo(db.Client, {foreignKey: 'Client_id'});
db.Client.hasMany(db.Code, {foreignKey: 'Client_id'});

db.Token = sequelize.import(__dirname + "/Token");
db.Token.belongsTo(db.Utente, {foreignKey: 'Utente_id'});
db.Utente.hasMany(db.Token, {foreignKey: 'Utente_id'});
db.Token.belongsTo(db.Client, {foreignKey: 'Client_id'});
db.Client.hasMany(db.Token, {foreignKey: 'Client_id'});




//db.User = sequelize.import(__dirname + "/User");
db.Sezione = sequelize.import(__dirname + "/Sezione");
db.StatoDonatore = sequelize.import(__dirname + "/StatoDonatore");
db.TipoDonazione = sequelize.import(__dirname + "/TipoDonazione");
db.Donatore = sequelize.import(__dirname + "/Donatore");
db.Donazione = sequelize.import(__dirname + "/Donazione");

db.Donatore.belongsTo(db.Sezione, {foreignKey: 'Sezione_id'});
db.Sezione.hasMany(db.Donatore, {foreignKey: 'Sezione_id'});

db.Donatore.belongsTo(db.StatoDonatore, {foreignKey: 'StatoDonatore_id'});
db.StatoDonatore.hasMany(db.Donatore, {foreignKey: 'StatoDonatore_id'});

db.Donazione.belongsTo(db.Donatore, {foreignKey: 'Donatore_id'});
db.Donatore.hasMany(db.Donazione, {foreignKey: 'Donatore_id'});

db.Donazione.belongsTo(db.TipoDonazione, {foreignKey: 'TipoDonazione_id'});
db.TipoDonazione.hasMany(db.Donazione, {foreignKey: 'TipoDonazione_id'});

//Sezione.belongsTo(Donatore);
//StatoDonatore.belongsTo(Donatore);
//Donazione.belongsTo(Donatore);
//Donatore.hasMany(Donazione);
//TipoDonazione.belongsTo(Donazione);

//primo initialize del database, una volta completato commentare queste istruzioni altrimenti lo fa sempre e spiana tutti i dati
var bcrypt = require('../controllers/bcrypt');
if(false){
    sequelize.sync().then(function(){
        // Tables created
    });
} else {
    sequelize.sync({force: true}).then(function () {
        // Tables created
        db.Utente.create({
            username: 'denny.biasiolli@gmail.com',
            password: 'denny',
            email: 'denny.biasiolli@gmail.com'
        }).then(function(utente){
            db.Client.create({
                name: 'Test Client',
                id: 'this_is_my_id',
                secret: 'this_is_my_secret',
                Utente_id: utente.id
            });
        });
        db.Utente.create({
            username: 'antonella.marengo@gmail.com',
            password: 'anto',
            email: 'antonella.marengo@gmail.com'
        }).then(function(utente){
            db.Client.create({
                name: 'Test Client',
                id: 'this_is_my_id',
                secret: 'this_is_my_secret',
                Utente_id: utente.id
            });
        });

        //db.User.create({
        //    username: 'denny.biasiolli@gmail.com',
        //    password: db.User.generateHash('denny'), //bcrypt.hashSync('denny'),
        //    email: 'denny.biasiolli@gmail.com'
        //});

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
        }).then(function(sezione) {
            //console.log(sezione.get('id') + ' ' + sezione.get('Descrizione'));
            db.StatoDonatore.create({
                id: 1, Descrizione: 'Attivo', DescrizioneEstesa: 'Attivo', Attivo: true
            }).then(function(statoDonatore) {
                //console.log(statoDonatore.get('id') + ' ' + statoDonatore.get('Descrizione'));
                db.TipoDonazione.create({ Descrizione: 'Sangue intero' }).then(function(tipoDonazione){
                    //console.log(tipoDonazione);
                    //sezione.addDonatore(
                    //    db.Donatore.build({ Cognome: 'Biasiolli', Nome: 'Denny', Sesso: 'M' })
                    //).then(function(donatore){
                    //    donatore.setStatoDonatore(statoDonatore);
                    //    donatore.addDonazione(db.Donazione.build({DataDonazione: new Date()})).then(function(donazione){                        
                    //        donazione.setTipoDonazione(tipoDonazione).then(function(dd){
                    //            //console.log(donazione);
                    //            //db.Donatore.findAll({ include: [{ model: db.Donazione, as: 'Donazioni' }] }).then(function(donatori) {
                    //            //    console.log(JSON.stringify(donatori));
                    //            //});
                    //            db.Sezione.findAll({ 
                    //                include: [{
                    //                    model: db.Donatore,
                    //                    include: [
                    //                        {
                    //                            model: db.Donazione,
                    //                            include: db.TipoDonazione
                    //                        },
                    //                        db.StatoDonatore
                    //                    ]
                    //                }]
                    //            }).then(function(statoDonatore) {
                    //                console.log(JSON.stringify(statoDonatore));
                    //            });
                    //        });
                    //    });
                    //});
                });
                db.TipoDonazione.create({ Descrizione: 'Plasma' }).then(function(tipoDonazione){});
                db.TipoDonazione.create({ Descrizione: 'Piastrine' }).then(function(tipoDonazione){});
                db.TipoDonazione.create({ Descrizione: 'Donazione' }).then(function(tipoDonazione){});

                //db.Donatore.create({
                //    Cognome: 'Biasiolli', Nome: 'Denny'
                //}).then(function(donatore) {
                //    console.log(donatore.get('id') + ' ' + donatore.get('Cognome') + ' ' + donatore.get('Nome'));
                //    db.Donatore.findById(donatore.get('id')).then(function(donatore){
                //        //donatore.addDonazione(db.Donazione.build({DataDonazione: new Date()})).then(function(t4){
                //        //    db.Donatore.findAll({ include: [ db.Donazione ] }).then(function(donatori) {
                //        //        console.log(JSON.stringify(donatori));
                //        //    });
                //        //});
                //    });
                //});

            });
            db.StatoDonatore.create({
                id: 2, Descrizione: 'SEM', DescrizioneEstesa: 'Socio Emerito', Attivo: false
            }).then(function(statoDonatore) {
                //console.log(statoDonatore.get('id') + ' ' + statoDonatore.get('Descrizione'));
            });
            db.StatoDonatore.create({
                id: 3, Descrizione: 'SSO', DescrizioneEstesa: 'Socio Sostenitore', Attivo: false
            }).then(function(statoDonatore) {
                //console.log(statoDonatore.get('id') + ' ' + statoDonatore.get('Descrizione'));
            });

            //db.Donatore.create({
            //    Cognome: 'Rossi', Nome: 'Mario'
            //}).then(function(donatore) {
            //    console.log(donatore.get('id') + ' ' + donatore.get('Cognome') + ' ' + donatore.get('Nome'));
            //    db.Donatore.findById(donatore.get('id')).then(function(donatore){
            //        donatore.addDonazione(db.Donazione.build({DataDonazione: new Date()})).then(function(t4){
            //            db.Donatore.findAll({ include: [ db.Donazione ] }).then(function(donatori) {
            //                console.log(JSON.stringify(donatori));
            //            });
            //        });
            //    });
            //});

        });

    });
}
//else{
//    //db.Donatore.findAll({ include: [{ model: db.Donazione, as: 'Donazioni' }] }).then(function(donatori) {
//    //    console.log(JSON.stringify(donatori));
//    //});
//    db.Sezione.findAll({ 
//        include: [{
//            model: db.Donatore,
//            include: [
//                {
//                    model: db.Donazione
//                },
//                db.StatoDonatore
//            ]
//        }]
//    }).then(function(statoDonatore) {
//        console.log(JSON.stringify(statoDonatore));
//    });
//}

module.exports = db;