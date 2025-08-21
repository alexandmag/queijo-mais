import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './context/CarrinhoContext';

// Páginas
import PaginaInicial from './pages/PaginaInicial';
import PaginaProdutos from './pages/PaginaProdutos';
import PaginaCarrinho from './pages/PaginaCarrinho';
import PaginaCheckout from './pages/PaginaCheckout';

// Componentes Globais
import Cabecalho from './components/comum/Cabecalho';
import Rodape from './components/comum/Rodape';

// Estilos
import './styles/App.css';
import './styles/global.css';

function App() {
  return (
    <CarrinhoProvider>
      <Router>
        <div className="App">
          <Cabecalho />
          
          <main className="conteudo-principal">
            <Routes>
              <Route path="/" element={<PaginaInicial />} />
              <Route path="/produtos" element={<PaginaProdutos />} />
              <Route path="/carrinho" element={<PaginaCarrinho />} />
              <Route path="/checkout" element={<PaginaCheckout />} />
            </Routes>
          </main>
          
          <Rodape />
        </div>
      </Router>
    </CarrinhoProvider>
  );
}

export default App;