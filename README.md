# 🧀 Queijo Mais - Marketplace de Queijos Artesanais

Um marketplace moderno para conectar consumidores aos melhores produtores de queijos artesanais, com integração direta ao WhatsApp para facilitar os pedidos.

## 🚀 Funcionalidades

- ✅ **Catálogo de Fornecedores**: Navegue entre diferentes produtores locais
- ✅ **Carrinho Inteligente**: Adicione produtos de diferentes fornecedores
- ✅ **Integração WhatsApp**: Envie pedidos diretamente ao fornecedor
- ✅ **Interface Responsiva**: Funciona perfeitamente em mobile e desktop
- ✅ **Gestão de Endereços**: Sistema completo de entrega

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, React Router DOM
- **Gerenciamento de Estado**: React Context API
- **Estilização**: CSS3 com variáveis customizadas
- **Integração**: WhatsApp Business API
- **Ferramentas**: Create React App, ESLint, Prettier

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── comum/           # Componentes compartilhados
│   ├── fornecedor/      # Componentes de fornecedor
│   ├── produto/         # Componentes de produto
│   ├── carrinho/        # Componentes do carrinho
│   └── checkout/        # Componentes de finalização
├── pages/               # Páginas da aplicação
├── context/             # Contexts para gerenciamento de estado
├── hooks/               # Custom hooks
├── services/            # Serviços e APIs
├── utils/               # Funções utilitárias
├── styles/              # Arquivos CSS organizados
└── assets/              # Imagens, ícones e recursos
```

## 🏃‍♂️ Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Git

### Instalação
```bash
# 1. Clone o repositório
git clone https://github.com/alexandmag/queijo-mais.git
cd queijo-mais

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Execute o projeto
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 🔧 Scripts Disponíveis

- `npm start` - Executa o projeto em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa os testes
- `npm run lint` - Verifica problemas de código
- `npm run format` - Formata o código automaticamente

## 📱 Como Funciona

1. **Seleção de Fornecedor**: O usuário escolhe entre os fornecedores disponíveis
2. **Escolha de Produtos**: Adiciona os queijos desejados ao carrinho
3. **Informações de Entrega**: Preenche o endereço de entrega
4. **Envio via WhatsApp**: O pedido é formatado e enviado ao fornecedor

## 🎨 Customização de Estilos

O projeto utiliza variáveis CSS para facilitar a customização:

```css
/* src/styles/variables.css */
:root {
  --cor-primaria: #ffa500;
  --cor-secundaria: #ff8c00;
  --cor-sucesso: #28a745;
  --fonte-principal: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## 📦 Deploy

### Netlify
```bash
npm run build
# Faça upload da pasta build/ no Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📧 Contato

Alexandre Magno - [@alexandmag](https://www.linkedin.com/in/alexandmag/) - alexandmagarapro@gmail.com

Link do Projeto: [https://github.com/alexandmag/queijo-mais](https://github.com/alexandmag/queijo-mais)

---

⭐ **Feito com ❤️ para conectar produtores e consumidores de queijos artesanais**