const { Admin } = require('../models');

class AdminRepository {
    async findByLogin(login) {
        return Admin.findOne({
            where: { login }
        });
    }

    async findById(id) {
        return Admin.findByPk(id, {
            attributes: { exclude: ['senha'] }
            //medida de segurança pra nbao enviar a senha pra quem vai consumir a api
        });
    }

    async findAll() {
        return Admin.findAll({
            attributes: { exclude: ['senha'] }
        });
    }

    async create(data) {
        return Admin.create(data);
    }

    async updateRole(id, role) {
        return Admin.update(
            { role },
            { where: { id } }
        );
    }
}

module.exports = new AdminRepository();