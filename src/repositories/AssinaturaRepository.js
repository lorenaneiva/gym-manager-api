const { User, Plano, Mensalidade } = require('../models');

class AssinaturaRepository {
    async findPlanoById(planoId) {
        return Plano.findByPk(planoId);
    }

    async findUserById(userId) {
        return User.findByPk(userId);
    }

    calcularDataVencimento(duracaoDias) {
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + Number(duracaoDias || 30));

        return hoje.toISOString().slice(0, 10);
    }

    async assinarPlano(userId, planoId) {
        const user = await User.findByPk(userId);
        const plano = await Plano.findByPk(planoId);

        if (!user || !plano) {
            return null;
        }

        await user.update({
            role: 'aluno',
            planoId,
            planoAtivo: true
        });

        await Mensalidade.create({
            alunoId: userId,
            planoId,
            valor: plano.valor,
            status: 'pendente',
            dataVencimento: this.calcularDataVencimento(plano.duracaoDias)
        });

        return User.findByPk(userId, {
            attributes: {
                exclude: ['senha']
            }
        });
    }
}

module.exports = new AssinaturaRepository();