const TreinoRepository = require('../repositories/TreinoRepository');

class TreinoController {
    async create(req, res) {
        try {
            const { nome, descricao, series, repeticoes, alunoId, instrutorId } = req.body;
            
            if (!nome || !series || !repeticoes || !alunoId) {
                return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
            }

            const treino = await TreinoRepository.create({
                nome,
                descricao,
                series,
                repeticoes,
                alunoId,
                instrutorId: instrutorId || req.user.id 
            });

            return res.status(201).json({ data: treino });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar treino' });
        }
    }

    async index(req, res) {
        try {
            const treinos = await TreinoRepository.findAll();
            return res.json({ data: treinos });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar treinos' });
        }
    }

    async findByAluno(req, res) {
        try {
            const { alunoId } = req.params;
            const treinos = await TreinoRepository.findByAlunoId(alunoId);
            
            return res.json({ data: treinos });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar treinos do aluno' });
        }
    }

    async meusTreinos(req, res) {
        try {
            const alunoId = req.user.id; 
            const treinos = await TreinoRepository.findByAlunoId(alunoId);
            
            return res.json({ data: treinos });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar seus treinos' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            
            await TreinoRepository.update(id, data);
            
            const treino = await TreinoRepository.findById(id);
            
            return res.json({ message: 'Treino atualizado com sucesso', data: treino });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar treino' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            
            await TreinoRepository.delete(id);
            
            return res.status(204).send(); 
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar treino' });
        }
    }
}

module.exports = new TreinoController();