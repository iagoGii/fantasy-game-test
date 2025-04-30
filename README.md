# Fantasy FC Clone

Este é um clone simplificado de um jogo fantasy estilo Cartola FC, construído com **Next.js (App Router)**, **React 18**, **TypeScript** e **Tailwind CSS**. Todos os dados são servidos por _mocks_ locais, sem necessidade de APIs externas.

---

## 📁 Estrutura de Pastas

```
fantasy-game-next-react/
├── app/
│   ├── api/                # Rotas de API mockadas
│   ├── layout.tsx          # Layout global (Navbar, Container)
│   ├── page.tsx            # Redirect para /dashboard
│   ├── dashboard/page.tsx  # Página de Dashboard
│   ├── team/page.tsx       # Página Meu Time
│   └── league/page.tsx     # Página Ligas
├── components/             # Componentes de UI (Navbar, Card, etc.)
├── context/                # Context API para gerenciamento de time
├── lib/                    # Funções de fetch mockado
├── mocks/                  # Dados estáticos de jogadores, times e ligas
├── styles/                 # CSS global (Tailwind)
├── .gitignore
├── next.config.js          # Configuração do Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd fantasy-game-next-react
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Rodando em modo de desenvolvimento**
   ```bash
   npm run dev
   ```
   - Acesse `http://localhost:3000` no navegador.  
   - A rota raiz redireciona automaticamente para `/dashboard`.

4. **Build de produção**
   ```bash
   npm run build
   npm start
   ```

---

## 🎨 Tecnologias

- **Framework**: Next.js 13+ (App Router)  
- **Biblioteca UI**: React 18  
- **Estilo**: Tailwind CSS  
- **Mock de dados**: módulos em TypeScript dentro de `/mocks`  
- **State Management**: React Context API (Time & Orçamento)  

---

## ⚙️ Funcionalidades Principais

- Listagem de jogadores da Série A Brasileira  
- Orçamento e compra de jogadores (mock)  
- Exibição e remoção de jogadores no time  
- Listagem de ligas públicas (Série A, Série B, privadas)  
- Navegação responsiva com menu hamburger  
- Layout composto por Container e Cards  

---

## 🛠️ Customizações

- **Mocks**: Para alterar os jogadores, edite `mocks/players.ts`.  
- **Preços**: Ajuste campo `price` no mock.  
- **Posições**: Valores livres em `position`.  

---

## 📄 Licença

Projeto para fins educacionais e de demonstração.