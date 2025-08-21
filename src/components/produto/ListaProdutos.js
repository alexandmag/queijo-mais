import React from 'react';
import CartaoProduto from './CartaoProduto';

function ListaProdutos({ produtos, carregando, fornecedor, aoAdicionarItem }) {
    if (carregando) {
        return <p className="mensagem-carregamento">Carregando produtos...</p>;
    }

    return (
        <section className="produtos-disponveis">
            <h2>Produtos de {fornecedor.nome}</h2>
            <div className="grid-produtos">
                {produtos.map(produto => (
                    <CartaoProduto
                        key={produto.id}
                        produto={produto}
                        aoAdicionar={() => aoAdicionarItem(produto)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaProdutos;