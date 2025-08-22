import React, { createContext, useContext, useState } from 'react';
import { obterProdutosPorFornecedor } from '../utils/dadosMock';

const ProdutoContext = createContext();

export function ProdutoProvider({ children }) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [filtros, setFiltros] = useState({
        categoria: '',
        preco: ''
    });

    const carregarProdutos = async (fornecedorId) => {
        setCarregando(true);
        try {
            const dados = obterProdutosPorFornecedor(fornecedorId);
            setProdutos(dados);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setCarregando(false);
        }
    };

    const filtrarProdutos = () => {
        let produtosFiltrados = [...produtos];

        if (filtros.categoria) {
            produtosFiltrados = produtosFiltrados.filter(p => p.categoria === filtros.categoria);
        }

        if (filtros.preco) {
            const [min, max] = filtros.preco.split('-').map(p => p.replace('+', ''));
            produtosFiltrados = produtosFiltrados.filter(p => {
                if (max) {
                    return p.preco >= parseFloat(min) && p.preco <= parseFloat(max);
                } else {
                    return p.preco >= parseFloat(min);
                }
            });
        }

        return produtosFiltrados;
    };

    const value = {
        produtos,
        carregando,
        filtros,
        setFiltros,
        carregarProdutos,
        filtrarProdutos
    };

    return (
        <ProdutoContext.Provider value={value}>
            {children}
        </ProdutoContext.Provider>
    );
}

export function useProduto() {
    const context = useContext(ProdutoContext);
    if (context === undefined) {
        throw new Error('useProduto deve ser usado dentro de um ProdutoProvider');
    }
    return context;
}