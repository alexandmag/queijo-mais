import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';

function Cabecalho() {
    const { calcularQuantidadeTotal } = useCarrinho();

    return (
        <header className="cabecalho">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>🧀 Queijo Mais</h1>
                    </Link>
                </div>

                <nav className="navegacao">
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li>
                            <Link to="/carrinho" className="link-carrinho">
                                Carrinho ({calcularQuantidadeTotal()})
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Cabecalho;