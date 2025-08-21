// src/utils/dadosMock.js
// Dados de exemplo para desenvolvimento

const fornecedores = [
    {
        id: 1,
        nome: "Queijaria Vale Verde",
        descricao: "Produtores artesanais desde 1985",
        localizacao: "Serra da Mantiqueira, MG",
        avaliacao: 4.8,
        whatsapp: "5531987654321",
        especialidades: ["Queijo Minas", "Coalho", "Requeijão"],
        foto: "https://via.placeholder.com/300x200?text=Vale+Verde"
    },
    {
        id: 2,
        nome: "Fazenda Boa Vista",
        descricao: "Tradição familiar em queijos especiais",
        localizacao: "Região de Araxá, MG",
        avaliacao: 4.9,
        whatsapp: "5534912345678",
        especialidades: ["Queijo Canastra", "Cabra", "Defumados"],
        foto: "https://via.placeholder.com/300x200?text=Boa+Vista"
    },
    {
        id: 3,
        nome: "Laticínios São Francisco",
        descricao: "Queijos frescos e curados com qualidade",
        localizacao: "São Roque de Minas, MG",
        avaliacao: 4.7,
        whatsapp: "5537998877665",
        especialidades: ["Mussarela", "Parmesão", "Ricota"],
        foto: "https://via.placeholder.com/300x200?text=São+Francisco"
    }
];

const produtos = {
    1: [ // Queijaria Vale Verde
        {
            id: 101,
            nome: "Queijo Minas Frescal",
            descricao: "Queijo fresco e cremoso, perfeito para o café da manhã",
            preco: 18.50,
            peso: "500g",
            categoria: "Frescos",
            imagem: "https://via.placeholder.com/300x300?text=Minas+Frescal"
        },
        {
            id: 102,
            nome: "Queijo de Coalho",
            descricao: "Tradicional queijo para grelhar, sabor incomparável",
            preco: 22.00,
            peso: "400g",
            categoria: "Tradicionais",
            imagem: "https://via.placeholder.com/300x300?text=Coalho"
        },
        {
            id: 103,
            nome: "Requeijão Cremoso",
            descricao: "Requeijão artesanal cremoso e saboroso",
            preco: 15.90,
            peso: "300g",
            categoria: "Cremosos",
            imagem: "https://via.placeholder.com/300x300?text=Requeijão"
        }
    ],
    2: [ // Fazenda Boa Vista
        {
            id: 201,
            nome: "Queijo Canastra Curado",
            descricao: "Queijo canastra com 45 dias de cura, sabor intenso",
            preco: 45.00,
            peso: "600g",
            categoria: "Curados",
            imagem: "https://via.placeholder.com/300x300?text=Canastra"
        },
        {
            id: 202,
            nome: "Queijo de Cabra",
            descricao: "Queijo cremoso de cabra, sabor suave e diferenciado",
            preco: 35.50,
            peso: "350g",
            categoria: "Especiais",
            imagem: "https://via.placeholder.com/300x300?text=Cabra"
        },
        {
            id: 203,
            nome: "Queijo Defumado",
            descricao: "Queijo defumado com lenha de aroeira, aroma único",
            preco: 42.90,
            peso: "500g",
            categoria: "Defumados",
            imagem: "https://via.placeholder.com/300x300?text=Defumado"
        }
    ],
    3: [ // Laticínios São Francisco
        {
            id: 301,
            nome: "Mussarela de Búfala",
            descricao: "Mussarela fresca de leite de búfala, muito cremosa",
            preco: 28.00,
            peso: "250g",
            categoria: "Frescos",
            imagem: "https://via.placeholder.com/300x300?text=Mussarela"
        },
        {
            id: 302,
            nome: "Parmesão Ralado",
            descricao: "Parmesão curado e ralado na hora, ideal para massas",
            preco: 32.50,
            peso: "200g",
            categoria: "Ralados",
            imagem: "https://via.placeholder.com/300x300?text=Parmesão"
        },
        {
            id: 303,
            nome: "Ricota Fresca",
            descricao: "Ricota fresca e levinha, perfeita para doces e salgados",
            preco: 12.90,
            peso: "400g",
            categoria: "Frescos",
            imagem: "https://via.placeholder.com/300x300?text=Ricota"
        }
    ]
};

// Funções para simular API
export function obterFornecedores() {
    return fornecedores;
}

export function obterFornecedorPorId(id) {
    return fornecedores.find(fornecedor => fornecedor.id === id);
}

export function obterProdutosPorFornecedor(fornecedorId) {
    return produtos[fornecedorId] || [];
}

export function obterProdutoPorId(produtoId, fornecedorId) {
    const produtosFornecedor = produtos[fornecedorId] || [];
    return produtosFornecedor.find(produto => produto.id === produtoId);
}

// Função para gerar mensagem WhatsApp
export function gerarMensagemWhatsApp(itens, endereco, fornecedor) {
    let mensagem = `🧀 *NOVO PEDIDO - Queijo Mais*\n\n`;
    mensagem += `📋 *ITENS DO PEDIDO:*\n`;

    let total = 0;
    itens.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `• ${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;

    mensagem += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    mensagem += `${endereco.rua}, ${endereco.numero}\n`;
    mensagem += `${endereco.bairro} - ${endereco.cidade}\n`;
    mensagem += `CEP: ${endereco.cep}\n`;
    if (endereco.complemento) {
        mensagem += `Complemento: ${endereco.complemento}\n`;
    }

    mensagem += `\n📱 Pedido feito através do Queijo Mais`;

    return encodeURIComponent(mensagem);
}