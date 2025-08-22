import React, { useState, useEffect } from 'react';
import useCEP from '../../hooks/useCEP';

function FormularioEndereco({ endereco, aoAlterarEndereco }) {
    const { buscarCEP, carregando, erro, formatarCEP, validarCEP } = useCEP();
    const [cepConsultado, setCepConsultado] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Se for CEP, formatar automaticamente
        if (name === 'cep') {
            const cepFormatado = formatarCEP(value.replace(/\D/g, ''));
            aoAlterarEndereco(prev => ({
                ...prev,
                [name]: cepFormatado
            }));
        } else {
            aoAlterarEndereco(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCEPBlur = async (e) => {
        const cep = e.target.value;
        
        if (validarCEP(cep) && !cepConsultado) {
            const dadosCEP = await buscarCEP(cep);
            
            if (dadosCEP) {
                aoAlterarEndereco(prev => ({
                    ...prev,
                    cep: dadosCEP.cep,
                    rua: dadosCEP.rua,
                    bairro: dadosCEP.bairro,
                    cidade: dadosCEP.cidade,
                    uf: dadosCEP.uf
                }));
                setCepConsultado(true);
            }
        }
    };

    const limparEndereco = () => {
        aoAlterarEndereco({
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            cep: '',
            complemento: ''
        });
        setCepConsultado(false);
    };

    // Reset do flag quando CEP muda
    useEffect(() => {
        setCepConsultado(false);
    }, [endereco.cep]);

    return (
        <div className="formulario-endereco">
            <div className="cabecalho-formulario">
                <h2>Endereço de Entrega</h2>
                <button 
                    type="button" 
                    className="btn-limpar-endereco"
                    onClick={limparEndereco}
                >
                    Limpar
                </button>
            </div>

            <form>
                <div className="campo-cep">
                    <input
                        type="text"
                        name="cep"
                        placeholder="CEP *"
                        value={endereco.cep}
                        onChange={handleInputChange}
                        onBlur={handleCEPBlur}
                        maxLength="9"
                        required
                        className={erro ? 'campo-erro' : ''}
                    />
                    {carregando && (
                        <div className="indicador-carregamento">
                            <span>🔍 Buscando CEP...</span>
                        </div>
                    )}
                    {erro && (
                        <div className="mensagem-erro-cep">
                            ⚠️ {erro}
                        </div>
                    )}
                    {cepConsultado && !erro && (
                        <div className="mensagem-sucesso-cep">
                            ✅ Endereço encontrado automaticamente
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    name="rua"
                    placeholder="Rua *"
                    value={endereco.rua}
                    onChange={handleInputChange}
                    required
                />

                <div className="linha-formulario">
                    <input
                        type="text"
                        name="numero"
                        placeholder="Número *"
                        value={endereco.numero}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="complemento"
                        placeholder="Complemento"
                        value={endereco.complemento}
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    type="text"
                    name="bairro"
                    placeholder="Bairro *"
                    value={endereco.bairro}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade *"
                    value={endereco.cidade}
                    onChange={handleInputChange}
                    required
                />

                <div className="dica-cep">
                    💡 <strong>Dica:</strong> Digite o CEP e os dados do endereço serão preenchidos automaticamente
                </div>
            </form>
        </div>
    );
}

export default FormularioEndereco;