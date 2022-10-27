const { DataTypes, Model } = require('sequelize');
const { sequelizeCon } = require('../config/db-config');

class Episodio extends Model {}
    
Episodio.init({
    numero: DataTypes.STRING,
    nome: DataTypes.STRING,
    //animeid: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'episodio'
});


module.exports = { Episodio };