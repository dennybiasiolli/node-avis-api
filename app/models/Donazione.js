module.exports = function(sequelize, DataTypes) {
    //var Donatore = sequelize.import(__dirname + "/Donatore");
    //var TipoDonazione = sequelize.import(__dirname + "/TipoDonazione");
    return sequelize.define('Donazione', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        DataDonazione: DataTypes.DATE
        //Donatore_id: {
        //    type: DataTypes.INTEGER,
        //    references: {
        //        model: Donatore,
        //        key: 'id'
        //    }
        //},
        //TipoDonazione_id: {
        //    type: DataTypes.INTEGER,
        //    references: {
        //        model: TipoDonazione,
        //        key: 'id'
        //    }
        //}
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        name: { plural: 'Donazioni', singular: 'Donazione' }
        //classMethods:{
        //    associate: function(models){
        //        models.Donazione.belongsTo(models.Donatore, { foreignKey: 'Donatore_id'} );
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
