const AdminLogRepository = require('../repositories/AdminLogRepository');

class AdminLogController {
    // listar todos os logs administrativos 
    async index(req, res) {
        try {
            const logs = await AdminLogRepository.findAll();

            return res.json({
                data: logs
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar logs administrativos'
            });
        }
    }

    // filtra os logs por administrador para rastrear as ações de um admin especifico.
    async byAdmin(req, res) {
        try {
            const { adminId } = req.params;

            const logs = await AdminLogRepository.findByAdminId(adminId);

            return res.json({
                data: logs
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar logs do administrador'
            });
        }
    }
}

module.exports = new AdminLogController();
