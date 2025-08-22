import React from 'react';

function ResumoFinal({ itens, total }) {
    return (
        <div className="resumo-final">
            <h2>Resumo do Pedido</h2>
            <div className="itens-resumo">
                {itens.map(item => (
                    <div key={`${item.id}-${item.fornecedorId}`} className="item-resumo">
                        <span>{item.nome} x{item.quantidade}</span>
                        <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="total-final">
                <strong>Total: R$ {total.toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default ResumoFinal;