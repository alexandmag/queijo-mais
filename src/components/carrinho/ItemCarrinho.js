import React from 'react';

function ItemCarrinho({ item, aoRemover, aoAtualizarQuantidade }) {
    return (
        <div className="item-carrinho">
            <img src={item.imagem} alt={item.nome} />
            <div className="info-item">
                <h3>{item.nome}</h3>
                <p className="fornecedor">De: {item.nomeFornecedor}</p>
                <p className="preco">R$ {item.preco.toFixed(2)} cada</p>
            </div>
            <div className="controles-quantidade">
                <button
                    onClick={() => aoAtualizarQuantidade(item.id, item.fornecedorId, item.quantidade - 1)}
                >
                    -
                </button>
                <span>{item.quantidade}</span>
                <button
                    onClick={() => aoAtualizarQuantidade(item.id, item.fornecedorId, item.quantidade + 1)}
                >
                    +
                </button>
            </div>
            <div className="subtotal">
                R$ {(item.preco * item.quantidade).toFixed(2)}
            </div>
            <button
                className="btn-remover"
                onClick={() => aoRemover(item.id, item.fornecedorId)}
            >
                Remover
            </button>
        </div>
    );
}

export default ItemCarrinho;