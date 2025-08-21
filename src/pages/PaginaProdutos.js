import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

function PaginaCarrinho() {
    const {
        itens,
        calcularTotal,
        calcularQuantidadeTotal,
        removerItem,
        atualizarQuantidade,
        limparCarrinho
    } = useCarrinho();

    if (itens.length === 0) {
        return (
            <div className="pagina-carrinho">
                <div className="container">
                    <h1>Seu Carrinho</h1>
                    <div className="carrinho-vazio">
                        <p>Seu carrinho está vazio</p>
                        <Link to="/produtos" className="btn-primary">
                            Ver Produtos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pagina-carrinho">
            <div className="container">
                <h1>Seu Carrinho ({calcularQuantidadeTotal()} itens)</h1>

                <div className="conteudo-carrinho">
                    <div className="itens-carrinho">
                        {itens.map((item, index) => (
                            <div key={`${item.id}-${item.fornecedorId}`} className="item-carrinho">
                                <img src={item.imagem} alt={item.nome} />
                                <div className="info-item">
                                    <h3>{item.nome}</h3>
                                    <p className="fornecedor">De: {item.nomeFornecedor}</p>
                                    <p className="preco">R$ {item.preco.toFixed(2)} cada</p>
                                </div>
                                <div className="controles-quantidade">
                                    <button
                                        onClick={() => atualizarQuantidade(item.id, item.fornecedorId, item.quantidade - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantidade}</span>
                                    <button
                                        onClick={() => atualizarQuantidade(item.id, item.fornecedorId, item.quantidade + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="subtotal">
                                    R$ {(item.preco * item.quantidade).toFixed(2)}
                                </div>
                                <button
                                    className="btn-remover"
                                    onClick={() => removerItem(item.id, item.fornecedorId)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="resumo-carrinho">
                        <h3>Resumo do Pedido</h3>
                        <div className="linha-total">
                            <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
                        </div>
                        <div className="acoes-carrinho">
                            <button
                                className="btn-limpar"
                                onClick={limparCarrinho}
                            >
                                Limpar Carrinho
                            </button>
                            <Link to="/checkout" className="btn-primary">
                                Finalizar Pedido
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaCarrinho;