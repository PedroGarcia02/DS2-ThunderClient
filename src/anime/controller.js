const AnimeRepository = require('./repositorio-sql');
const EpisodioRepository = require('../episodio/repositorio-sql');

class AnimeController {
    constructor() {
        this.repository = new AnimeRepository();
        this.repositoryEpisodios = new EpisodioRepository();
    }
    async cadastrar(req, res) {
        const { nome, produtora } =  req.body;
        const animacao = {
            nome, produtora, usuarioEmail: req.user.email
        };
        const animeId = await this.repository.save(animacao);
        const eps = {
            numero: req.body.episodios.numero,
            nome: req.body.episodios.nome
        }
        var c = 0;
        while(c < eps.nome.length){
            let episodioItens = {
                numero: eps.numero[c],
                nome: eps.nome[c],
                animeId: animeId
            };
            c++
            await this.repositoryEpisodios.save(episodioItens);
        }
        return res.json({message:"Sucesso na inclusão"});

    }

    async mostrar(req, res) {
        const listagem = await this.repository.list();
        return res.json(listagem);
    }

    async update(req, res) {
        const { id } = req.params;
        const anime = await this.repository.find(id);
        if (anime && req.user.email == anime.usuarioEmail) {
            try {
                const response = await this.repository.put(id, req.body);
                return res.json(response);
            } catch(e){
                res.status(400);
                console.error(e);
                return res.json({ message: "Body inválido ou Sem autorização" });
            }
            
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado ou Sem autorização" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const anime = await this.repository.find(id);
        if (anime && req.user.email == anime.usuarioEmail) {
            await this.repository.delete(id);
            return res.json();
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado ou Sem autorização" });
        }
    }

    async detail(req, res) {
        const { id } = req.params;
        const anime = await this.repository.find(id);
        if(anime){
            return res.json(anime);
        } else {
            res.status(404);
            return res.json({message: "Objeto não encontrado"});
        }
    }
    

}


module.exports = AnimeController;