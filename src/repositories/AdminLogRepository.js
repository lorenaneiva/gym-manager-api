const { AdminLog, Admin } = require('../models');

class AdminLogRepository {
    async create(data) {
        return AdminLog.create(data);
    }

    async findAll() {
        return AdminLog.findAll({
            include: [
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['id', 'nome', 'login']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findByAdminId(adminId) {
        return AdminLog.findAll({
            where: { adminId },
            include: [
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['id', 'nome', 'login']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
}

module.exports = new AdminLogRepository();
