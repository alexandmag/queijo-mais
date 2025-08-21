import React from 'react';

function CartaoProduto({ produto, aoAdicionar }) {
    return (
        <div className="cartao-produto">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p className="descricao">{produto.descricao}</p>
            <div className="info-produto">
                <span className="preco">R$ {produto.preco.toFixed(2)}</span>
                <span className="peso">{produto.peso}</span>
            </div>
            <button
                className="btn-adicionar"
                onClick={aoAdicionar}
            >
                Adicionar ao Carrinho
            </button>
        </div>
    );
}

export default CartaoProduto;