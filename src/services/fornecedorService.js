import api from './api';
import { obterFornecedores, obterFornecedorPorId } from '../utils/dadosMock';

export const fornecedorService = {
    async listarTodos() {
        try {
            // Em desenvolvimento, usar dados mock
            if (process.env.NODE_ENV === 'development') {
                return obterFornecedores();
            }
            
            return await api.get('/fornecedores');
        } catch (error) {
            console.error('Erro ao listar fornecedores:', error);
            // Fallback para dados mock em caso de erro
            return obterFornecedores();
        }
    },

    async obterPorId(id) {
        try {
            if (process.env.NODE_ENV === 'development') {
                return obterFornecedorPorId(id);
            }
            
            return await api.get(`/fornecedores/${id}`);
        } catch (error) {
            console.error('Erro ao obter fornecedor:', error);
            return obterFornecedorPorId(id);
        }
    },

    async buscar(termo) {
        try {
            if (process.env.NODE_ENV === 'development') {
                const fornecedores = obterFornecedores();
                return fornecedores.filter(f => 
                    f.nome.toLowerCase().includes(termo.toLowerCase()) ||
                    f.especialidades.some(esp => esp.toLowerCase().includes(termo.toLowerCase()))
                );
            }
            
            return await api.get(`/fornecedores/buscar?q=${encodeURIComponent(termo)}`);
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
            return [];
        }
    }
};