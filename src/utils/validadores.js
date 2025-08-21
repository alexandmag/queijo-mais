export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validarCEP(cep) {
    const regex = /^\d{5}-?\d{3}$/;
    return regex.test(cep);
}

export function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}

export function validarCampoObrigatorio(valor) {
    return valor && valor.trim().length > 0;
}

export function validarFormularioEndereco(endereco) {
    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'cep'];

    for (const campo of camposObrigatorios) {
        if (!validarCampoObrigatorio(endereco[campo])) {
            return {
                valido: false,
                erro: `O campo ${campo} é obrigatório`
            };
        }
    }

    if (!validarCEP(endereco.cep)) {
        return {
            valido: false,
            erro: 'CEP inválido'
        };
    }

    return { valido: true };
}