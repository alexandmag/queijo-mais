import React from 'react';

function FiltrosProdutos({ filtros, aoAlterarFiltros }) {
    return (
        <div className="filtros-produtos">
            <h3>Filtrar por:</h3>
            <div className="filtros">
                <select
                    value={filtros.categoria}
                    onChange={(e) => aoAlterarFiltros({ ...filtros, categoria: e.target.value })}
                >
                    <option value="">Todas as categorias</option>
                    <option value="Frescos">Frescos</option>
                    <option value="Curados">Curados</option>
                    <option value="Especiais">Especiais</option>
                </select>
                
                <select
                    value={filtros.preco}
                    onChange={(e) => aoAlterarFiltros({ ...filtros, preco: e.target.value })}
                >
                    <option value="">Qualquer preço</option>
                    <option value="0-20">Até R$ 20</option>
                    <option value="20-40">R$ 20 - R$ 40</option>
                    <option value="40+">Acima de R$ 40</option>
                </select>
            </div>
        </div>
    );
}

export default FiltrosProdutos;