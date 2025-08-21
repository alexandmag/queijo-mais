import React, { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { gerarMensagemWhatsApp } from '../utils/dadosMock';

function PaginaCheckout() {
    const { itens, calcularTotal, endereco, setEndereco, fornecedorSelecionado } = useCarrinho();
    const [enviandoPedido, setEnviandoPedido] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEndereco(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const finalizarPedido = () => {
        if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.cep) {
            alert('Por favor, preencha todos os campos obrigatórios do endereço.');
            return;
        }

        setEnviandoPedido(true);

        // Agrupar itens por fornecedor
        const itensPorFornecedor = {};
        itens.forEach(item => {
            if (!itensPorFornecedor[item.fornecedorId]) {
                itensPorFornecedor[item.fornecedorId] = {
                    fornecedor: {
                        nome: item.nomeFornecedor,
                        whatsapp: '5531999999999' // Buscar do banco de dados real
                    },
                    itens: []
                };
            }
            itensPorFornecedor[item.fornecedorId].itens.push(item);
        });

        // Enviar mensagem para cada fornecedor
        Object.values(itensPorFornecedor).forEach(({ fornecedor, itens }) => {
            const mensagem = gerarMensagemWhatsApp(itens, endereco, fornecedor);
            const urlWhatsApp = `https://wa.me/${fornecedor.whatsapp}?text=${mensagem}`;

            // Abrir WhatsApp em nova aba
            window.open(urlWhatsApp, '_blank');
        });

        setTimeout(() => {
            setEnviandoPedido(false);
            alert('Pedidos enviados com sucesso! Verifique o WhatsApp.');
        }, 2000);
    };

    if (itens.length === 0) {
        return (
            <div className="pagina-checkout">
                <div className="container">
                    <h1>Finalizar Pedido</h1>
                    <p>Não há itens no carrinho para finalizar o pedido.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pagina-checkout">
            <div className="container">
                <h1>Finalizar Pedido</h1>

                <div className="conteudo-checkout">
                    <div className="formulario-endereco">
                        <h2>Endereço de Entrega</h2>
                        <form>
                            <div className="linha-formulario">
                                <input
                                    type="text"
                                    name="rua"
                                    placeholder="Rua *"
                                    value={endereco.rua}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="numero"
                                    placeholder="Número *"
                                    value={endereco.numero}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="bairro"
                                placeholder="Bairro *"
                                value={endereco.bairro}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="cidade"
                                placeholder="Cidade *"
                                value={endereco.cidade}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="cep"
                                placeholder="CEP *"
                                value={endereco.cep}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="complemento"
                                placeholder="Complemento (opcional)"
                                value={endereco.complemento}
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>

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
                            <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
                        </div>
                        <button
                            className="btn-finalizar"
                            onClick={finalizarPedido}
                            disabled={enviandoPedido}
                        >
                            {enviandoPedido ? 'Enviando...' : 'Enviar Pedido via WhatsApp'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaCheckout;