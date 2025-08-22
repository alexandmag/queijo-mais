import React, { useState, useEffect } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { obterFornecedores, obterProdutosPorFornecedor } from '../utils/dadosMock';
import CartaoProduto from '../components/produto/CartaoProduto';

function PaginaProdutos() {
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { adicionarItem } = useCarrinho();

    useEffect(() => {
        // Carregar fornecedores
        const dadosFornecedores = obterFornecedores();
        setFornecedores(dadosFornecedores);
        
        // Selecionar primeiro fornecedor por padrão
        if (dadosFornecedores.length > 0) {
            selecionarFornecedor(dadosFornecedores[0]);
        }
        
        setCarregando(false);
    }, []);

    const selecionarFornecedor = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        const produtosFornecedor = obterProdutosPorFornecedor(fornecedor.id);
        setProdutos(produtosFornecedor);
    };

    const adicionarProdutoAoCarrinho = (produto) => {
        if (fornecedorSelecionado) {
            adicionarItem(produto, fornecedorSelecionado, 1);
            alert('Produto adicionado ao carrinho!');
        }
    };

    if (carregando) {
        return (
            <div className="container">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="pagina-produtos">
            <div className="container">
                <h1>Nossos Fornecedores</h1>
                
                <section className="fornecedores-disponiveis">
                    <h2>Escolha um fornecedor:</h2>
                    <div className="grid-fornecedores">
                        {fornecedores.map(fornecedor => (
                            <div
                                key={fornecedor.id}
                                className={`cartao-fornecedor ${
                                    fornecedorSelecionado?.id === fornecedor.id ? 'selecionado' : ''
                                }`}
                                onClick={() => selecionarFornecedor(fornecedor)}
                            >
                                <h3>{fornecedor.nome}</h3>
                                <p>{fornecedor.descricao}</p>
                                <div className="info-fornecedor">
                                    <span>📍 {fornecedor.localizacao}</span>
                                    <span>⭐ {fornecedor.avaliacao}</span>
                                </div>
                                <div className="especialidades">
                                    {fornecedor.especialidades.map(esp => (
                                        <span key={esp} className="tag-especialidade">
                                            {esp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {fornecedorSelecionado && (
                    <section className="produtos-disponveis">
                        <h2>Produtos de {fornecedorSelecionado.nome}</h2>
                        <div className="grid-produtos">
                            {produtos.map(produto => (
                                <CartaoProduto
                                    key={produto.id}
                                    produto={produto}
                                    aoAdicionar={() => adicionarProdutoAoCarrinho(produto)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default PaginaProdutos;