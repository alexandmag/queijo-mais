import React from 'react';

function Modal({ mostrar, aoFechar, titulo, children }) {
    if (!mostrar) return null;

    return (
        <div className="modal-overlay" onClick={aoFechar}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{titulo}</h3>
                    <button className="btn-fechar" onClick={aoFechar}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;