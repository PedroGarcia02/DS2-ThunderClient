const { Anime } = require('./model');
const { Episodio } = require('../episodio/model');

class AnimeRepository {
    constructor() {
    }

    async save(anime) {
        const animeDB = await Anime.create(anime);
        return animeDB.toJSON().id;
    }

    async put(idParam, animeBody) {
        const {nome, produtora, id} = animeBody;
        await Anime.update({
            nome, produtora,id
        },
            {
                where: { id: idParam },
            });
        const idConsulta = id ? id : idParam;
        const animeQuery = await Anime.findByPk(idConsulta);
        return animeQuery.toJSON();
    }

    async find(id) {
        const anime = await Anime.findByPk(id, {
            include: [
                {
                    model: Episodio,
                    required: false
                }
            ]
        });
        return anime;
    }

    async list() {
        const listagem = await Anime.findAll();
        return listagem;
    }

    async delete(id) {
        await Anime.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = AnimeRepository;