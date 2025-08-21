import React, { createContext, useContext, useState, useReducer } from 'react';

// Context do Carrinho
const CarrinhoContext = createContext();

// Reducer para gerenciar estado do carrinho
function carrinhoReducer(state, action) {
    switch (action.type) {
        case 'ADICIONAR_ITEM':
            const itemExistente = state.itens.find(item =>
                item.id === action.payload.id &&
                item.fornecedorId === action.payload.fornecedorId
            );

            if (itemExistente) {
                return {
                    ...state,
                    itens: state.itens.map(item =>
                        item.id === action.payload.id && item.fornecedorId === action.payload.fornecedorId
                            ? { ...item, quantidade: item.quantidade + action.payload.quantidade }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    itens: [...state.itens, action.payload]
                };
            }

        case 'REMOVER_ITEM':
            return {
                ...state,
                itens: state.itens.filter(item =>
                    !(item.id === action.payload.id && item.fornecedorId === action.payload.fornecedorId)
                )
            };

        case 'ATUALIZAR_QUANTIDADE':
            return {
                ...state,
                itens: state.itens.map(item =>
                    item.id === action.payload.id && item.fornecedorId === action.payload.fornecedorId
                        ? { ...item, quantidade: action.payload.quantidade }
                        : item
                )
            };

        case 'LIMPAR_CARRINHO':
            return {
                ...state,
                itens: []
            };

        case 'DEFINIR_FORNECEDOR_SELECIONADO':
            return {
                ...state,
                fornecedorSelecionado: action.payload
            };

        default:
            return state;
    }
}

// Estado inicial do carrinho
const estadoInicial = {
    itens: [],
    fornecedorSelecionado: null
};

// Provider do Context
export function CarrinhoProvider({ children }) {
    const [state, dispatch] = useReducer(carrinhoReducer, estadoInicial);
    const [endereco, setEndereco] = useState({
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: '',
        complemento: ''
    });

    // Função para calcular total
    const calcularTotal = () => {
        return state.itens.reduce((total, item) => {
            return total + (item.preco * item.quantidade);
        }, 0);
    };

    // Função para calcular quantidade total de itens
    const calcularQuantidadeTotal = () => {
        return state.itens.reduce((total, item) => total + item.quantidade, 0);
    };

    // Funções de ação
    const adicionarItem = (produto, fornecedor, quantidade = 1) => {
        dispatch({
            type: 'ADICIONAR_ITEM',
            payload: {
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                fornecedorId: fornecedor.id,
                nomeFornecedor: fornecedor.nome,
                quantidade
            }
        });
    };

    const removerItem = (produtoId, fornecedorId) => {
        dispatch({
            type: 'REMOVER_ITEM',
            payload: { id: produtoId, fornecedorId }
        });
    };

    const atualizarQuantidade = (produtoId, fornecedorId, quantidade) => {
        if (quantidade <= 0) {
            removerItem(produtoId, fornecedorId);
        } else {
            dispatch({
                type: 'ATUALIZAR_QUANTIDADE',
                payload: { id: produtoId, fornecedorId, quantidade }
            });
        }
    };

    const limparCarrinho = () => {
        dispatch({ type: 'LIMPAR_CARRINHO' });
    };

    const definirFornecedorSelecionado = (fornecedor) => {
        dispatch({
            type: 'DEFINIR_FORNECEDOR_SELECIONADO',
            payload: fornecedor
        });
    };

    const value = {
        itens: state.itens,
        fornecedorSelecionado: state.fornecedorSelecionado,
        endereco,
        setEndereco,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        definirFornecedorSelecionado,
        calcularTotal,
        calcularQuantidadeTotal
    };

    return (
        <CarrinhoContext.Provider value={value}>
            {children}
        </CarrinhoContext.Provider>
    );
}

// Hook personalizado para usar o context
export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    if (context === undefined) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
}