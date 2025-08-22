export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validarCEP(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Verifica se tem exatamente 8 dígitos
    if (cepLimpo.length !== 8) {
        return false;
    }
    
    // Verifica se não é um CEP inválido conhecido
    const cepsInvalidos = [
        '00000000', '11111111', '22222222', '33333333',
        '44444444', '55555555', '66666666', '77777777',
        '88888888', '99999999'
    ];
    
    return !cepsInvalidos.includes(cepLimpo);
}

export function formatarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}

export function validarCampoObrigatorio(valor) {
    return valor && valor.trim().length > 0;
}

export function validarFormularioEndereco(endereco) {
    const erros = [];
    
    // Validar campos obrigatórios
    const camposObrigatorios = {
        cep: 'CEP',
        rua: 'Rua',
        numero: 'Número',
        bairro: 'Bairro',
        cidade: 'Cidade'
    };

    Object.entries(camposObrigatorios).forEach(([campo, nome]) => {
        if (!validarCampoObrigatorio(endereco[campo])) {
            erros.push(`${nome} é obrigatório`);
        }
    });

    // Validar formato do CEP
    if (endereco.cep && !validarCEP(endereco.cep)) {
        erros.push('CEP inválido');
    }

    // Validar número (deve ser numérico)
    if (endereco.numero && !/^\d+[a-zA-Z]?$/.test(endereco.numero.trim())) {
        erros.push('Número deve conter apenas dígitos (ex: 123, 45A)');
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validarDadosPedido(itens, endereco) {
    const erros = [];

    // Validar se há itens no carrinho
    if (!itens || itens.length === 0) {
        erros.push('Carrinho está vazio');
    }

    // Validar endereço
    const validacaoEndereco = validarFormularioEndereco(endereco);
    if (!validacaoEndereco.valido) {
        erros.push(...validacaoEndereco.erros);
    }

    // Validar valores dos produtos
    itens.forEach((item, index) => {
        if (!item.preco || item.preco <= 0) {
            erros.push(`Item ${index + 1}: Preço inválido`);
        }
        if (!item.quantidade || item.quantidade <= 0) {
            erros.push(`Item ${index + 1}: Quantidade inválida`);
        }
    });

    return {
        valido: erros.length === 0,
        erros
    };
}

export function sanitizarTexto(texto) {
    return texto.trim().replace(/[<>'"]/g, '');
}

export function validarIdade(idade) {
    const idadeNum = parseInt(idade);
    return idadeNum >= 0 && idadeNum <= 120;
}

export function validarNome(nome) {
    return nome && nome.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim());
}