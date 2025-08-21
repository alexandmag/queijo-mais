export function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

export function formatarCEP(cep) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatarTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
}

export function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

export function formatarTextoUrl(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
}