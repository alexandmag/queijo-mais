import api from './api';
import { obterProdutosPorFornecedor, obterProdutoPorId } from '../utils/dadosMock';

export const produtoService = {
    async listarPorFornecedor(fornecedorId) {
        try {
            if (process.env.NODE_ENV === 'development') {
                return obterProdutosPorFornecedor(fornecedorId);
            }
            
            return await api.get(`/fornecedores/${fornecedorId}/produtos`);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            return obterProdutosPorFornecedor(fornecedorId);
        }
    },

    async obterPorId(produtoId, fornecedorId) {
        try {
            if (process.env.NODE_ENV === 'development') {
                return obterProdutoPorId(produtoId, fornecedorId);
            }
            
            return await api.get(`/fornecedores/${fornecedorId}/produtos/${produtoId}`);
        } catch (error) {
            console.error('Erro ao obter produto:', error);
            return obterProdutoPorId(produtoId, fornecedorId);
        }
    },

    async buscar(termo, fornecedorId = null) {
        try {
            const endpoint = fornecedorId 
                ? `/fornecedores/${fornecedorId}/produtos/buscar?q=${encodeURIComponent(termo)}`
                : `/produtos/buscar?q=${encodeURIComponent(termo)}`;
                
            return await api.get(endpoint);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return [];
        }
    }
};