const { User } = require('../models');

class UserRepository {
    async findByLogin(login) {
        return User.findOne({
            where: { login }
        });
    }

    async findById(id) {
        return User.findByPk(id, {
            attributes: { exclude: ['senha'] }
        });
    }

    async findAll() {
        return User.findAll({
            attributes: { exclude: ['senha'] }
        });
    }

    async create(data) {
        return User.create(data);
    }

    async updateRole(id, role) {
        return User.update(
            { role },
            { where: { id } }
        );
    }
}

module.exports = new UserRepository();