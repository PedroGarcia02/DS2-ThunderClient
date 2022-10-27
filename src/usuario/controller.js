const jwt = require('jsonwebtoken');
const { Usuario } = require('./model');
const UsuariosRepository = require('./repositorio-sql');
const bcrypt = require('bcrypt');

class UsuariosController {
    constructor() {
        this.repository = new UsuariosRepository();
    }
    async cadastrar(req, res) {
        const { email, senha , nome } = req.body;
        const usuarioAchado = await Usuario.findOne({
            where: {
                email
            }
        });
        if (usuarioAchado){
            res.status(350);
            return res.json({message:"Email ja existe"})
        }
        const senhaCriptografada = bcrypt.hashSync(senha, 10); 
        const user = await this.repository.save({
            email,
            nome, 
            senha: senhaCriptografada
        });
        return res.status(250).json(user);

    }
    async auth(req, res) {
        const { email, senha } = req.body;

        const usuarioAchado = await Usuario.findOne({
            where: {
                email
            }
        });

        const confere = bcrypt.compareSync(senha, usuarioAchado.senha);

        if (!confere) {
            return res.status(405).json({ msg: "login Incorreto."});
        }
        const meuJwt = jwt.sign(usuarioAchado.dataValues, "SECRET%$#")
        return res.json({token: meuJwt});
    }

    async mostrar(req, res) {
        const users = await Usuario.findAndCountAll();
        return res.status(202).json(users);
    }
}

module.exports = UsuariosController;