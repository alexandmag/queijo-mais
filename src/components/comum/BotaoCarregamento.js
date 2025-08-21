import React from 'react';

function BotaoCarregamento({ carregando, children, ...props }) {
    return (
        <button {...props} disabled={carregando}>
            {carregando ? 'Carregando...' : children}
        </button>
    );
}

export default BotaoCarregamento;