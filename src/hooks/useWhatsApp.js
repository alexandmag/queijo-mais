import { gerarMensagemWhatsApp } from '../utils/dadosMock';

function useWhatsApp() {
    const enviarPedido = (itens, endereco) => {
        // Agrupar itens por fornecedor
        const itensPorFornecedor = {};
        
        itens.forEach(item => {
            if (!itensPorFornecedor[item.fornecedorId]) {
                itensPorFornecedor[item.fornecedorId] = {
                    fornecedor: {
                        nome: item.nomeFornecedor,
                        whatsapp: '5537998377733' // Em produção, buscar do banco de dados
                    },
                    itens: []
                };
            }
            itensPorFornecedor[item.fornecedorId].itens.push(item);
        });

        // Enviar mensagem para cada fornecedor
        const promises = Object.values(itensPorFornecedor).map(({ fornecedor, itens }) => {
            return new Promise((resolve) => {
                const mensagem = gerarMensagemWhatsApp(itens, endereco, fornecedor);
                const urlWhatsApp = `https://wa.me/${fornecedor.whatsapp}?text=${mensagem}`;
                
                // Abrir WhatsApp em nova aba
                window.open(urlWhatsApp, '_blank');
                
                // Simular delay entre aberturas
                setTimeout(resolve, 500);
            });
        });

        return Promise.all(promises);
    };

    const formatarMensagem = (itens, endereco, fornecedor) => {
        return gerarMensagemWhatsApp(itens, endereco, fornecedor);
    };

    return {
        enviarPedido,
        formatarMensagem
    };
}

export default useWhatsApp;