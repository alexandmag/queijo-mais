import React from 'react';
import { gerarMensagemWhatsApp } from '../../utils/dadosMock';

function BotaoWhatsApp({ itens, endereco, enviando, aoEnviar }) {
    const finalizarPedido = () => {
        if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.cep) {
            alert('Por favor, preencha todos os campos obrigatórios do endereço.');
            return;
        }

        aoEnviar();

        // Agrupar itens por fornecedor
        const itensPorFornecedor = {};
        itens.forEach(item => {
            if (!itensPorFornecedor[item.fornecedorId]) {
                itensPorFornecedor[item.fornecedorId] = {
                    fornecedor: {
                        nome: item.nomeFornecedor,
                        whatsapp: '5537998377733' // Buscar do banco de dados real
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
            alert('Pedidos enviados com sucesso! Verifique o WhatsApp.');
        }, 2000);
    };

    return (
        <button
            className="btn-finalizar"
            onClick={finalizarPedido}
            disabled={enviando}
        >
            {enviando ? 'Enviando...' : 'Enviar Pedido via WhatsApp'}
        </button>
    );
}

export default BotaoWhatsApp;