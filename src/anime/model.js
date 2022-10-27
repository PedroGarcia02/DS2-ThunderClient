const { DataTypes, Model } = require('sequelize');
const { Usuario } = require('../usuario/model');
const { Episodio } = require('../episodio/model');

const { sequelizeCon } = require('../config/db-config');

class Anime extends Model { }

Anime.init({
    produtora: DataTypes.STRING,
    nome: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'anime'
});

Anime.belongsTo(Usuario);
Usuario.hasMany(Anime);
Episodio.belongsTo(Anime, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Anime.hasMany(Episodio, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
sequelizeCon.sync();

module.exports = { Anime };