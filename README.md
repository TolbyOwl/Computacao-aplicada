# Projeto Acolhimento - Sistema de Gestão Clínica

Este é um sistema full-stack desenvolvido para a gestão de atendimentos psicológicos e clínicos, unindo um front-end moderno em **React** com um back-end robusto em **Flask (Python)** e banco de dados **Supabase**.

## 🏗️ Estrutura do Projeto

O repositório está dividido em duas pastas principais:

- **`/frontend`**: Aplicação React estruturada com Vite e estilizada com Tailwind CSS.
- **`/backend`**: API REST desenvolvida em Flask, seguindo o padrão de fábrica de aplicativos (Factory Pattern).

---

## 🚀 Guia de Inicialização

### 1. Front-end (React)
Para rodar a interface:

1. Entre na pasta:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
   *Isso baixará as bibliotecas necessárias listadas no `package.json` (React, React Router, Tailwind, etc).*
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### 2. Back-end (Flask)
Para rodar a API:

1. Entre na pasta:
   ```bash
   cd backend
   ```
2. Crie um ambiente virtual (recomendado):
   ```bash
   python -m venv venv
   ```
3. Ative o ambiente:
   - **Windows:** `venv\Scripts\activate`
   - **Linux/Mac:** `source venv/bin/activate`
4. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
5. Inicie o servidor:
   ```bash
   flask run
   ```

---

## 📂 Organização e Boas Práticas

### Front-end
- **`/src/pages`**: Cada tela do sistema (Login, Dashboard, etc.) deve ter sua própria subpasta aqui.
- **`/src/components`**: Componentes reutilizáveis (botões, inputs, modais).
- **`/src/styles`**: Arquivos CSS globais e configurações de tema.

### Back-end
- **`/routes`**: Definição dos endpoints da API. Use Blueprints para separar rotas de Autenticação das de Pacientes.
- **`/models`**: Definição das tabelas do banco de dados.
- **`/controllers`**: Lógica de negócio que processa as requisições antes de salvar/buscar no banco.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/).
- **Back-end:** [Flask](https://flask.palletsprojects.com/), [Supabase](https://supabase.com/).
- **Padronização:** ESLint, Prettier e organização modular de arquivos.

---

## 📝 Documentação para o Desenvolvedor

1. **Nunca suba o `node_modules` ou `venv`:** Estes arquivos são gerados localmente e estão no `.gitignore`.
2. **Variáveis de Ambiente:** Use arquivos `.env` para chaves de API do Supabase. Um modelo está disponível em `.env.example`.
3. **Consistência:** Mantenha o padrão de nomenclatura PascalCase para componentes React e snake_case para funções Python.
