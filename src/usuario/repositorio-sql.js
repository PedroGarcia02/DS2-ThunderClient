const { Usuario } = require('./model');
const Sequelize = require('sequelize');

class UsuariosRepository {
    constructor() {
    }

    async save(usuario) {
        await Usuario.create(usuario);
    }

    async findOneEmailSenha(email, senha) {
        const usuario = await Usuario.findOne({
            where: {
                email, senha
            }
        });
        return usuario;
    }

}

module.exports = UsuariosRepository;