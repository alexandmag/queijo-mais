import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import FormularioEndereco from '../components/checkout/FormularioEndereco';
import ResumoFinal from '../components/checkout/ResumoFinal';
import BotaoWhatsApp from '../components/checkout/BotaoWhatsApp';

function PaginaCheckout() {
    const { itens, calcularTotal, endereco, setEndereco } = useCarrinho();
    const [enviandoPedido, setEnviandoPedido] = useState(false);

    const handleEnviarPedido = () => {
        setEnviandoPedido(true);
        
        // Simular processo de envio
        setTimeout(() => {
            setEnviandoPedido(false);
        }, 3000);
    };

    if (itens.length === 0) {
        return (
            <div className="pagina-checkout">
                <div className="container">
                    <h1>Finalizar Pedido</h1>
                    <div className="carrinho-vazio">
                        <p>Não há itens no carrinho para finalizar o pedido.</p>
                        <Link to="/produtos" className="btn-primary">
                            Ver Produtos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pagina-checkout">
            <div className="container">
                <h1>Finalizar Pedido</h1>

                <div className="conteudo-checkout">
                    <FormularioEndereco
                        endereco={endereco}
                        aoAlterarEndereco={setEndereco}
                    />

                    <div className="resumo-checkout">
                        <ResumoFinal
                            itens={itens}
                            total={calcularTotal()}
                        />
                        
                        <BotaoWhatsApp
                            itens={itens}
                            endereco={endereco}
                            enviando={enviandoPedido}
                            aoEnviar={handleEnviarPedido}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaCheckout;