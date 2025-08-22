import React, { createContext, useContext, useState } from 'react';
import { obterFornecedores, obterFornecedorPorId } from '../utils/dadosMock';

const FornecedorContext = createContext();

export function FornecedorProvider({ children }) {
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const carregarFornecedores = async () => {
        setCarregando(true);
        try {
            const dados = obterFornecedores();
            setFornecedores(dados);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        } finally {
            setCarregando(false);
        }
    };

    const selecionarFornecedor = (fornecedorId) => {
        const fornecedor = obterFornecedorPorId(fornecedorId);
        setFornecedorSelecionado(fornecedor);
    };

    const value = {
        fornecedores,
        fornecedorSelecionado,
        carregando,
        carregarFornecedores,
        selecionarFornecedor
    };

    return (
        <FornecedorContext.Provider value={value}>
            {children}
        </FornecedorContext.Provider>
    );
}

export function useFornecedor() {
    const context = useContext(FornecedorContext);
    if (context === undefined) {
        throw new Error('useFornecedor deve ser usado dentro de um FornecedorProvider');
    }
    return context;
}