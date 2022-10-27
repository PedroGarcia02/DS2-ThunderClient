const { Banca, Episodio } = require('./model');
const Sequelize = require('sequelize');

class repositorioEpisodios {
    constructor() {
    }

    async save(eps) {
        const id = await Episodio.create(eps);
        return id;
    }

    async put(idParam, episodioBody) {
        const { numero, nome, id, animeId } = episodioBody;
        await Episodio.update({
            numero, nome, id, animeId
        },
            {
                where: { id: idParam },
            });
        const idConsulta = id ? id : idParam;
        const EpConsulta = await Episodio.findByPk(idConsulta);
        return EpConsulta.toJSON();
    }

    async find(id) {
        const eps = await Episodio.findByPk(id);
        return eps;
    }

    async list() {
        const listagem = await Episodio.findAndCountAll();
        return listagem;
    }

    async delete(id) {
        await Episodio.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = repositorioEpisodios;