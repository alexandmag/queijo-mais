import React from 'react';

function DetalheProduto({ produto, fornecedor, aoAdicionar }) {
    if (!produto) return null;

    return (
        <div className="detalhe-produto">
            <div className="imagem-produto">
                <img src={produto.imagem} alt={produto.nome} />
            </div>
            <div className="info-produto-detalhada">
                <h1>{produto.nome}</h1>
                <p className="descricao">{produto.descricao}</p>
                <div className="meta-produto">
                    <span className="preco">R$ {produto.preco.toFixed(2)}</span>
                    <span className="peso">{produto.peso}</span>
                    <span className="categoria">{produto.categoria}</span>
                </div>
                {fornecedor && (
                    <div className="info-fornecedor">
                        <h3>Fornecedor:</h3>
                        <p>{fornecedor.nome}</p>
                        <p>{fornecedor.localizacao}</p>
                    </div>
                )}
                <button
                    className="btn-adicionar"
                    onClick={aoAdicionar}
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
}

export default DetalheProduto;