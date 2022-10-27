const repositorioEpisodios = require("./repositorio-sql");

class EpisodioController {

    constructor() {
        this.repository = new repositorioEpisodios();
    }

    async update(req, res) {
        const { id } = req.params;
        const eps = await this.repository.find(id);
        if (eps) {
            try {
                const response = await this.repository.put(id, req.body);
                return res.json(response);
            } catch (e) {
                res.status(400);
                console.error(e);
                return res.json({ message: "Body inválido" });
            }
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado" });
        }

    }
    async delete(req, res) {
        const { id } = req.params;
        const eps = await this.repository.find(id);
        if (eps) {
            await this.repository.delete(id);
            return res.json();
        } else {
            res.status(404);
            return res.json({ message: "Objeto não encontrado" });
        }
    }
    async mostrar(req, res) {
        const listagem = await this.repository.list();
        return res.json(listagem);
    }
}


module.exports = EpisodioController;