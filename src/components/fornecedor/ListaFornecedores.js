import React from 'react';
import CartaoFornecedor from './CartaoFornecedor';

function ListaFornecedores({ fornecedores, fornecedorSelecionado, aoSelecionarFornecedor }) {
    return (
        <section className="fornecedores-disponiveis">
            <h2>Escolha um fornecedor:</h2>
            <div className="grid-fornecedores">
                {fornecedores.map(fornecedor => (
                    <CartaoFornecedor
                        key={fornecedor.id}
                        fornecedor={fornecedor}
                        selecionado={fornecedorSelecionado?.id === fornecedor.id}
                        aoSelecionar={aoSelecionarFornecedor}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaFornecedores;