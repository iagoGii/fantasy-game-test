# Fantasy FC Clone

Este é um clone simplificado de um jogo fantasy estilo Cartola FC, construído com **Next.js (App Router)**, **React 18**, **TypeScript** e **Tailwind CSS**. Todos os dados são servidos por _mocks_ locais, sem necessidade de APIs externas.

---

## 📁 Estrutura de Pastas

```
fantasy-game-next-react/
├──  __tests__/              # Testes unitários
│   ├── Card.test.tsx
│   ├── Container.test.tsx
│   ├── layout.test.tsx
│   ├── Liga.test.tsx
│   ├── Navbar.test.tsx
│   ├── PlayerList.test.tsx
│   ├── TeamForm.test.tsx
│   ├── TeamPage.test.tsx
│   ├── mocks/
│   │   ├── playerMocks.ts
│   │   └── teamMocks.ts
│   └── pages/
│       ├── NavbarPage.tsx
│       ├── PlayerListPage.tsx
│       └── TeamPage.tsx
├── app/
│   ├── api/                # Rotas de API mockadas
│   ├── layout.tsx          # Layout global (Navbar, Container)
│   ├── page.tsx            # Redirect para /dashboard
│   ├── dashboard/page.tsx  # Página de Dashboard
│   ├── team/page.tsx       # Página Meu Time
│   └── league/page.tsx     # Página Ligas
├── components/             # Componentes de UI (Navbar, Card, etc.)
├── context/                # Context API para gerenciamento de time
├── cypress/                # Testes E2E
│   ├── e2e/
│   │   ├── buy-player.cy.ts
│   │   ├── navbar.cy.ts
│   │   └── responsive-menu.cy.ts
│   ├── fixtures/
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
├── lib/                    # Funções de fetch mockado
├── mocks/                  # Dados estáticos de jogadores, times e ligas
├── styles/                 # CSS global (Tailwind)
├── .gitignore
├── next.config.js          # Configuração do Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── vitest.setup.ts
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
- **Cypress**: Testes e2e
- **Vitest**: Testes unitários

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

## 🔧 Correções e Ajustes Técnicos

### Correção de Hidratação no Layout Principal
Foi identificado e corrigido um erro de hidratação do React no layout principal da aplicação. O erro ocorria devido a uma incompatibilidade entre o HTML renderizado no servidor e no cliente, especificamente relacionado ao atributo `data-lt-installed` adicionado pelo navegador.

**Solução Implementada:**
```tsx
// app/layout.tsx
<html lang="pt-BR" suppressHydrationWarning>
```

**Impacto:**
- Resolução do erro de hidratação no console
- Melhoria na estabilidade da aplicação
- Eliminação de warnings desnecessários

---

## ✅ Testes

### Frameworks Utilizados
- **Vitest**: Para testes unitários (alternativa moderna ao Jest, com 100% de compatibilidade)
- **Cypress**: Para testes E2E

### Por que Vitest?
- Compatibilidade total com a API do Jest
- Melhor performance e integração com Next.js
- Suporte nativo a TypeScript
- UI moderna para visualização de testes
- Mesma sintaxe e recursos do Jest

### Comandos de Teste
```bash
# Testes Unitários
npx vitest run --coverage                # Roda os testes em modo Headless e gera a cobertura de testes
npx vitest run --reporter verbose        # Rodar testes unitários
npm run test:ui                          # Gerar relatório de cobertura visível pela UI

# Testes E2E
npx cypress open                         # Abrir Cypress em modo interativo
npx cypress run --browser chrome         # Rodar testes E2E em modo headless com o navegador chrome
npm run test:e2e:headless                # Rodar testes E2E em modo headless

```
> **Nota**: A interface web do Vitest oferece uma visualização mais completa e interativa da cobertura de testes, incluindo:
> - Porcentagem de cobertura por arquivo
> - Linhas cobertas e não cobertas
> - Branches cobertos e não cobertos
> - Funções cobertas e não cobertas

---

## 🧪 Casos de Teste

### Testes Unitários
Os testes unitários cobrem os seguintes cenários principais:

1. **Componentes de UI:**
   - **Card:** Verifica a renderização correta e o comportamento de exibição de informações.
   - **Container:** Garante que o layout do container seja renderizado corretamente.
   - **Navbar:** Testa a navegação e o destaque do link ativo.
   - **PlayerList:** Valida a exibição de jogadores e interações, como cliques.
   - **TeamPage:** Gerencia a exibição da página "Meu Time", incluindo o orçamento atual, jogadores do time e a funcionalidade de remoção de jogadores.
   - **TeamForm:** Testa o formulário de criação de time, incluindo cenários de sucesso e erro.

2. **Lógica de Negócio:**
   - **createTeam:** Valida o comportamento da função de criação de time com mocks.
   - **Orçamento:** Garante que o orçamento seja atualizado corretamente após a compra de jogadores.

3. **Context API:**
   - Testa o gerenciamento de estado global para o time e orçamento.

---

### Testes E2E
Os testes E2E cobrem os seguintes fluxos principais:

1. **Compra de Jogador:**
   - Verifica se um jogador pode ser comprado no dashboard.
   - Garante que o jogador comprado desapareça da listagem e apareça na funcionalidade "Meu Time".

2. **Navegação Responsiva:**
   - Testa o comportamento do menu em dispositivos móveis e desktops.
   - Garante que o menu mobile abre e fecha corretamente.

3. **Interação com Ligas:**
   - Valida a exibição de ligas públicas e privadas.
   - Testa a navegação entre diferentes ligas.

4. **Orçamento e Jogadores no Meu Time:**
   - Garante que o orçamento seja atualizado corretamente após a compra de jogadores.
   - Valida que os jogadores comprados aparecem na funcionalidade "Meu Time" com os detalhes corretos.

---
## 📄 Licença

Projeto para fins educacionais e de demonstração.
