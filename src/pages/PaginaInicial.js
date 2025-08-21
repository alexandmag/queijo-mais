import React from 'react';
import { Link } from 'react-router-dom';

function PaginaInicial() {
    return (
        <div className="pagina-inicial">
            <section className="hero">
                <div className="container">
                    <h1>Bem-vindo ao Queijo Mais</h1>
                    <p>Descubra os melhores queijos artesanais direto dos produtores locais</p>
                    <Link to="/produtos" className="btn-primary">
                        Ver Produtos
                    </Link>
                </div>
            </section>

            <section className="como-funciona">
                <div className="container">
                    <h2>Como Funciona</h2>
                    <div className="passos">
                        <div className="passo">
                            <h3>1. Escolha o Fornecedor</h3>
                            <p>Selecione entre nossos fornecedores confiáveis</p>
                        </div>
                        <div className="passo">
                            <h3>2. Adicione os Queijos</h3>
                            <p>Monte seu carrinho com os queijos desejados</p>
                        </div>
                        <div className="passo">
                            <h3>3. Finalize pelo WhatsApp</h3>
                            <p>Sua mensagem será enviada diretamente ao fornecedor</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PaginaInicial;