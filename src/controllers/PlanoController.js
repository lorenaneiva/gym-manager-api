const PlanoRepository = require('../repositories/PlanoRepository')

class PlanoController {
    async index(req, res) {
        try {
            const planos = await PlanoRepository.findActive()

            return res.json({
                data: planos
            })
        } catch (error) {
            console.error('Erro ao listar planos:', error)

            return res.status(500).json({
                message: 'Erro ao listar planos'
            })
        }
    }

    async adminIndex(req, res) {
        try {
            const planos = await PlanoRepository.findAll()

            return res.json({
                data: planos
            })
        } catch (error) {
            console.error('Erro ao listar planos para admin:', error)

            return res.status(500).json({
                message: 'Erro ao listar planos'
            })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params

            const plano = await PlanoRepository.findById(id)

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                })
            }

            return res.json({
                data: plano
            })
        } catch (error) {
            console.error('Erro ao buscar plano:', error)

            return res.status(500).json({
                message: 'Erro ao buscar plano'
            })
        }
    }

    async store(req, res) {
        try {
            const { nome, descricao, valor, duracaoDias, ativo } = req.body

            if (!nome || !String(nome).trim()) {
                return res.status(400).json({
                    message: 'Nome é obrigatório'
                })
            }

            if (valor === undefined || valor === null || valor === '') {
                return res.status(400).json({
                    message: 'Valor é obrigatório'
                })
            }

            if (duracaoDias === undefined || duracaoDias === null || duracaoDias === '') {
                return res.status(400).json({
                    message: 'Duração é obrigatória'
                })
            }

            const valorNumerico = Number(valor)
            const duracaoNumerica = Number(duracaoDias)

            if (Number.isNaN(valorNumerico)) {
                return res.status(400).json({
                    message: 'Valor inválido'
                })
            }

            if (valorNumerico < 0) {
                return res.status(400).json({
                    message: 'Valor não pode ser negativo'
                })
            }

            if (!Number.isInteger(duracaoNumerica)) {
                return res.status(400).json({
                    message: 'Duração deve ser um número inteiro'
                })
            }

            if (duracaoNumerica <= 0) {
                return res.status(400).json({
                    message: 'Duração deve ser maior que zero'
                })
            }

            const plano = await PlanoRepository.create({
                nome: nome.trim(),
                descricao: descricao?.trim() || null,
                valor: valorNumerico,
                duracaoDias: duracaoNumerica,
                ativo: ativo ?? true
            })

            return res.status(201).json({
                data: plano
            })
        } catch (error) {
            console.error('Erro ao cadastrar plano:', error)

            return res.status(500).json({
                message: 'Erro ao cadastrar plano'
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { nome, descricao, valor, duracaoDias, ativo } = req.body

            const plano = await PlanoRepository.findById(id)

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                })
            }

            if (!nome || !String(nome).trim()) {
                return res.status(400).json({
                    message: 'Nome é obrigatório'
                })
            }

            if (valor === undefined || valor === null || valor === '') {
                return res.status(400).json({
                    message: 'Valor é obrigatório'
                })
            }

            if (duracaoDias === undefined || duracaoDias === null || duracaoDias === '') {
                return res.status(400).json({
                    message: 'Duração é obrigatória'
                })
            }

            const valorNumerico = Number(valor)
            const duracaoNumerica = Number(duracaoDias)

            if (Number.isNaN(valorNumerico)) {
                return res.status(400).json({
                    message: 'Valor inválido'
                })
            }

            if (valorNumerico < 0) {
                return res.status(400).json({
                    message: 'Valor não pode ser negativo'
                })
            }

            if (!Number.isInteger(duracaoNumerica)) {
                return res.status(400).json({
                    message: 'Duração deve ser um número inteiro'
                })
            }

            if (duracaoNumerica <= 0) {
                return res.status(400).json({
                    message: 'Duração deve ser maior que zero'
                })
            }

            const planoAtualizado = await PlanoRepository.update(id, {
                nome: nome.trim(),
                descricao: descricao?.trim() || null,
                valor: valorNumerico,
                duracaoDias: duracaoNumerica,
                ativo: ativo ?? true
            })

            return res.json({
                data: planoAtualizado
            })
        } catch (error) {
            console.error('Erro ao atualizar plano:', error)

            return res.status(500).json({
                message: 'Erro ao atualizar plano'
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            const plano = await PlanoRepository.findById(id)

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                })
            }

            await PlanoRepository.delete(id)

            return res.json({
                message: 'Plano excluído com sucesso'
            })
        } catch (error) {
            console.error('Erro ao excluir plano:', error)

            return res.status(500).json({
                message: 'Erro ao excluir plano'
            })
        }
    }
}

module.exports = new PlanoController()