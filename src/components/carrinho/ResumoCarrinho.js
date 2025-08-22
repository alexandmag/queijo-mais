import React from 'react';
import { Link } from 'react-router-dom';

function ResumoCarrinho({ total, aoLimpar }) {
    return (
        <div className="resumo-carrinho">
            <h3>Resumo do Pedido</h3>
            <div className="linha-total">
                <strong>Total: R$ {total.toFixed(2)}</strong>
            </div>
            <div className="acoes-carrinho">
                <button className="btn-limpar" onClick={aoLimpar}>
                    Limpar Carrinho
                </button>
                <Link to="/checkout" className="btn-primary">
                    Finalizar Pedido
                </Link>
            </div>
        </div>
    );
}

export default ResumoCarrinho;