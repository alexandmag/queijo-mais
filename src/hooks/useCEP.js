import { useState } from 'react';

function useCEP() {
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const buscarCEP = async (cep) => {
        // Limpar CEP (remover caracteres não numéricos)
        const cepLimpo = cep.replace(/\D/g, '');
        
        // Validar formato do CEP
        if (cepLimpo.length !== 8) {
            setErro('CEP deve ter 8 dígitos');
            return null;
        }

        setCarregando(true);
        setErro(null);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            
            if (!response.ok) {
                throw new Error('Erro na consulta do CEP');
            }

            const dados = await response.json();

            // Verificar se o CEP existe
            if (dados.erro) {
                setErro('CEP não encontrado');
                return null;
            }

            // Retornar dados formatados
            return {
                cep: formatarCEP(cepLimpo),
                rua: dados.logradouro || '',
                bairro: dados.bairro || '',
                cidade: dados.localidade || '',
                uf: dados.uf || '',
                complemento: dados.complemento || ''
            };

        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            setErro('Erro ao consultar CEP. Tente novamente.');
            return null;
        } finally {
            setCarregando(false);
        }
    };

    const formatarCEP = (cep) => {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const validarCEP = (cep) => {
        const cepLimpo = cep.replace(/\D/g, '');
        return cepLimpo.length === 8;
    };

    return {
        buscarCEP,
        carregando,
        erro,
        formatarCEP,
        validarCEP
    };
}

export default useCEP;