import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';

function BotaoCarrinho() {
    const { calcularQuantidadeTotal } = useCarrinho();
    
    return (
        <Link to="/carrinho" className="link-carrinho">
            Carrinho ({calcularQuantidadeTotal()})
        </Link>
    );
}

export default BotaoCarrinho;