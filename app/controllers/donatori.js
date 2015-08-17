var db = require('./../models');

exports.getDonatori = function(req, res) {
    //console.log(req.query);
    var filtri = req.query;
    //return res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
    delete filtri.NumTessera;
    db.Donatore.findAll({
        include: [ 
            {
                model: db.Donazione,
                include: db.TipoDonazione
            },
            db.Sezione, db.StatoDonatore ],
        where: filtri
    }).then(function(donatori) {
        return res.json(donatori);
    }).catch(function(error){
        return res.json(error);
    });
};

exports.postDonatori = function(req, res) {
    donatoriController.addDonatori(req.body);
    console.log(req.body);
    res.json(req.body);
}

exports.addDonatori = function(jsonDonatori, callback){
    db.Sezione.findAll().then(function(sezioni){
        db.StatoDonatore.findAll().then(function(statiDonatori){
            jsonDonatori.forEach(function(jsonDonatore){
                var objSezione = sezioni.filter(function(obj){
                    return obj.Descrizione === jsonDonatore.Sezione;
                })[0];
                var objStatoDonatore = statiDonatori.filter(function(obj){
                    return obj.Descrizione === jsonDonatore.StatoDonatore;
                })[0];
                db.Donatore.findOrCreate({
                    where: {idOld: jsonDonatore.id},
                    defaults: {
                        idOld:                  jsonDonatore.id,
                        NumTessera:             jsonDonatore.NumTessera,
                        NumTesseraCartacea:     jsonDonatore.NumTesseraCartacea,
                        DataRilascioTessera:    jsonDonatore.DataRilascioTessera,
                        CodiceFiscale:          jsonDonatore.CodiceFiscale,
                        Cognome:                jsonDonatore.Cognome,
                        Nome:                   jsonDonatore.Nome,
                        Sesso:                  jsonDonatore.Sesso,
                        DataIscrizione:         jsonDonatore.DataIscrizione,
                        GruppoSanguigno:        jsonDonatore.GruppoSanguigno,
                        Rh:                     jsonDonatore.Rh,
                        Fenotipo:               jsonDonatore.Fenotipo,
                        Kell:                   jsonDonatore.Kell,
                        Indirizzo:              jsonDonatore.Indirizzo,
                        Frazione:               jsonDonatore.Frazione,
                        Cap:                    jsonDonatore.Cap,
                        Comune:                 jsonDonatore.Comune,
                        Provincia:              jsonDonatore.Provincia,
                        Telefono:               jsonDonatore.Telefono,
                        TelefonoLavoro:         jsonDonatore.TelefonoLavoro,
                        Cellulare:              jsonDonatore.Cellulare,
                        Email:                  jsonDonatore.Email,
                        FermoPerMalattia:       jsonDonatore.FermoPerMalattia,
                        DonazioniPregresse:     jsonDonatore.DonazioniPregresse,
                        NumBenemerenze:         jsonDonatore.NumBenemerenze,
                        Sezione_id:             objSezione.id,
                        StatoDonatore_id:       objStatoDonatore.id
                    }
                });
            });
            if(callback)
                return callback(null);
        });
    });
};

exports.addDonazioni = function(jsonDonazioni, callback){
    db.Donatore.findAll().then(function(donatori){
        db.TipoDonazione.findAll().then(function(tipoDonazioni){
            jsonDonazioni.forEach(function(jsonDonazione){
                var objDonatore = donatori.filter(function(obj){
                    return obj.idOld === jsonDonazione.idDonatore;
                })[0];
                var objTipoDonazione = tipoDonazioni.filter(function(obj){
                    return obj.Descrizione === jsonDonazione.TipoDonazione;
                })[0];
                db.Donazione.findOrCreate({
                    where: {Donatore_id: objDonatore.id, TipoDonazione_id: objTipoDonazione.id, DataDonazione: jsonDonazione.DataDonazione},
                    defaults: {
                        DataDonazione:      jsonDonazione.DataDonazione,
                        Donatore_id:        objDonatore.id,
                        TipoDonazione_id:   objTipoDonazione.id
                    }
                })
            });
        });
    });
    if(callback)
        return callback(null);
};
