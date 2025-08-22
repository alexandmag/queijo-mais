import { useState, useEffect } from 'react';
import { obterFornecedores, obterFornecedorPorId } from '../utils/dadosMock';

function useFornecedores() {
    const [fornecedores, setFornecedores] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarFornecedores();
    }, []);

    const carregarFornecedores = async () => {
        try {
            setCarregando(true);
            setErro(null);
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const dados = obterFornecedores();
            setFornecedores(dados);
        } catch (error) {
            setErro('Erro ao carregar fornecedores');
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    const obterFornecedor = (id) => {
        return obterFornecedorPorId(parseInt(id));
    };

    return {
        fornecedores,
        carregando,
        erro,
        obterFornecedor,
        recarregar: carregarFornecedores
    };
}

export default useFornecedores;