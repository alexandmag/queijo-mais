export function criarLinkWhatsApp(telefone, mensagem) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    const mensagemCodificada = encodeURIComponent(mensagem);
    return `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`;
}

export function formatarMensagemPedido(itens, endereco, fornecedor) {
    let mensagem = `🧀 *NOVO PEDIDO - Queijo Mais*\n\n`;
    mensagem += `👋 Olá, ${fornecedor.nome}!\n\n`;
    mensagem += `📋 *ITENS DO PEDIDO:*\n`;

    let total = 0;
    itens.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `• ${item.nome}\n`;
        mensagem += `  Quantidade: ${item.quantidade}x\n`;
        mensagem += `  Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `  Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    mensagem += `💰 *TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n\n`;

    mensagem += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    mensagem += `${endereco.rua}, ${endereco.numero}\n`;
    mensagem += `${endereco.bairro} - ${endereco.cidade}\n`;
    mensagem += `CEP: ${endereco.cep}\n`;
    
    if (endereco.complemento) {
        mensagem += `Complemento: ${endereco.complemento}\n`;
    }

    mensagem += `\n📱 Pedido realizado através do *Queijo Mais*\n`;
    mensagem += `🕐 ${new Date().toLocaleString('pt-BR')}`;

    return mensagem;
}

export function validarDadosPedido(itens, endereco) {
    const erros = [];

    // Validar itens
    if (!itens || itens.length === 0) {
        erros.push('Carrinho está vazio');
    }

    // Validar endereço
    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'cep'];
    camposObrigatorios.forEach(campo => {
        if (!endereco[campo] || endereco[campo].trim() === '') {
            erros.push(`${campo} é obrigatório`);
        }
    });

    // Validar CEP
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (endereco.cep && !cepRegex.test(endereco.cep)) {
        erros.push('CEP inválido');
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function agruparItensPorFornecedor(itens) {
    const grupos = {};
    
    itens.forEach(item => {
        if (!grupos[item.fornecedorId]) {
            grupos[item.fornecedorId] = {
                fornecedor: {
                    id: item.fornecedorId,
                    nome: item.nomeFornecedor,
                    whatsapp: obterWhatsAppFornecedor(item.fornecedorId)
                },
                itens: [],
                total: 0
            };
        }
        
        grupos[item.fornecedorId].itens.push(item);
        grupos[item.fornecedorId].total += item.preco * item.quantidade;
    });
    
    return Object.values(grupos);
}

function obterWhatsAppFornecedor(fornecedorId) {
    // Em produção, buscar do banco de dados
    const whatsapps = {
        1: '5531987654321',
        2: '5534912345678',
        3: '5537998877665'
    };
    
    return whatsapps[fornecedorId] || '5537998377733';
}