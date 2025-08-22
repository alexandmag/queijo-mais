export const whatsappService = {
    gerarUrlWhatsApp(numeroTelefone, mensagem) {
        const numeroLimpo = numeroTelefone.replace(/\D/g, '');
        const mensagemCodificada = encodeURIComponent(mensagem);
        return `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`;
    },

    abrirWhatsApp(numeroTelefone, mensagem) {
        const url = this.gerarUrlWhatsApp(numeroTelefone, mensagem);
        window.open(url, '_blank');
    },

    formatarNumeroTelefone(numero) {
        // Remove todos os caracteres não numéricos
        const numeroLimpo = numero.replace(/\D/g, '');
        
        // Adiciona código do país se não estiver presente
        if (numeroLimpo.length === 11 && numeroLimpo.startsWith('0')) {
            return `55${numeroLimpo.substring(1)}`;
        } else if (numeroLimpo.length === 11) {
            return `55${numeroLimpo}`;
        } else if (numeroLimpo.length === 13 && numeroLimpo.startsWith('55')) {
            return numeroLimpo;
        }
        
        return numeroLimpo;
    },

    validarNumeroWhatsApp(numero) {
        const numeroLimpo = numero.replace(/\D/g, '');
        return numeroLimpo.length >= 10 && numeroLimpo.length <= 15;
    }
};