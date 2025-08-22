import React from 'react';

function DetalheFornecedor({ fornecedor }) {
    if (!fornecedor) return null;

    return (
        <div className="detalhe-fornecedor">
            <h2>{fornecedor.nome}</h2>
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

export default DetalheFornecedor;