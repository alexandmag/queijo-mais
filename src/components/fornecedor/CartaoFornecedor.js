import React from 'react';

function CartaoFornecedor({ fornecedor, selecionado, aoSelecionar }) {
    return (
        <div
            className={`cartao-fornecedor ${selecionado ? 'selecionado' : ''}`}
            onClick={() => aoSelecionar(fornecedor)}
        >
            <h3>{fornecedor.nome}</h3>
            <p>{fornecedor.descricao}</p>
            <div className="info-fornecedor">
                <span>📍 {fornecedor.localizacao}</span>
                <span>⭐ {fornecedor.avaliacao}</span>
            </div>
            <div className="especialidades">
                {fornecedor.especialidades.map(esp => (
                    <span key={esp} className="tag-especialidade">
                        {esp}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default CartaoFornecedor;
