import { useState, useEffect } from 'react';
import { obterProdutosPorFornecedor, obterProdutoPorId } from '../utils/dadosMock';

function useProdutos(fornecedorId) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (fornecedorId) {
            carregarProdutos(fornecedorId);
        }
    }, [fornecedorId]);

    const carregarProdutos = async (id) => {
        try {
            setCarregando(true);
            setErro(null);
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const dados = obterProdutosPorFornecedor(id);
            setProdutos(dados);
        } catch (error) {
            setErro('Erro ao carregar produtos');
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    const obterProduto = (produtoId) => {
        return obterProdutoPorId(produtoId, fornecedorId);
    };

    const filtrarProdutos = (filtros) => {
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

    return {
        produtos,
        carregando,
        erro,
        obterProduto,
        filtrarProdutos,
        recarregar: () => carregarProdutos(fornecedorId)
    };
}

export default useProdutos;