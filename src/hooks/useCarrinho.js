import { useContext } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext';

function useCarrinho() {
    const context = useContext(CarrinhoContext);
    
    if (context === undefined) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    
    return context;
}

export default useCarrinho;