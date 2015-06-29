module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Donatore', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idOld: DataTypes.INTEGER,
        NumTessera: DataTypes.STRING(5),
        NumTesseraCartacea: DataTypes.STRING(15),
        DataRilascioTessera: DataTypes.DATE,
        CodiceFiscale: DataTypes.STRING(16),
        Cognome: DataTypes.STRING(255),
        Nome: DataTypes.STRING(255),
        Sesso: DataTypes.STRING(1),
        DataIscrizione: DataTypes.DATE,
        GruppoSanguigno: DataTypes.STRING(2),
        Rh: DataTypes.STRING(1),
        Fenotipo: DataTypes.STRING(5),
        Kell: DataTypes.STRING(2),
        Indirizzo: DataTypes.STRING,
        Frazione: DataTypes.STRING,
        Cap: DataTypes.STRING(5),
        Comune: DataTypes.STRING,
        Provincia: DataTypes.STRING,
        Telefono: DataTypes.STRING,
        TelefonoLavoro: DataTypes.STRING,
        Cellulare: DataTypes.STRING,
        Email: DataTypes.STRING,
        FermoPerMalattia: DataTypes.BOOLEAN,
        DonazioniPregresse: DataTypes.INTEGER,
        NumBenemerenze: DataTypes.INTEGER,
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        name: { plural: 'Donatori', singular: 'Donatore' }
        //classMethods:{
        //    associate: function(models){
        //        models.Donatore.hasMany(models.Donazioni, { foreignKey: 'Donatore_id'} );
        //    }
        //}
        //indexes: [
        //    // Create a unique index on email
        //    {
        //        unique: true,
        //        fields: ['id']
        //    }
        //]
    })
}
