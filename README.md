# 🔍 Buscador de CEP

[![GitHub](https://img.shields.io/badge/GitHub-Reposit%C3%B3rio-blue?style=flat-square&logo=github)](https://github.com/ElianeLunguinho/Buscador-de-CEP)
[![Deploy](https://img.shields.io/badge/Vercel-Acessar%20Projeto-000000?style=flat-square&logo=vercel)](https://buscador-de-cep.vercel.app)

Aplicação web desenvolvida em React para busca automática de endereços através do CEP (Código de Endereçamento Postal brasileiro), utilizando a API pública ViaCEP.

## 📋 Visão Geral

O **Buscador de CEP** é uma ferramenta simples e eficiente que permite aos usuários digitar um CEP e automaticamente obter o endereço completo correspondente, incluindo:
- Rua/Avenida
- Bairro
- Cidade
- Estado (UF)

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão |
|------------|--------|
| React | 18.2.0 |
| Vite | 5.0.0 |
| ViaCEP API | - |

### Dependências do Projeto
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.0"
  }
}
```

## 📁 Estrutura do Projeto

```
BuscadorDeCep/
├── index.html          # Entry point HTML
├── package.json        # Dependências e scripts
├── vite.config.js      # Configuração do Vite
├── SPEC.md            # Especificação do projeto
└── src/
    ├── main.jsx       # Ponto de entrada React
    ├── App.jsx        # Componente principal
    └── index.css      # Estilos globais
```

## 🎨 Design e UI/UX

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#0f0f0f` | Fundo principal |
| Card | `#1a1a1a` | Container do formulário |
| Primary | `#00d9ff` | Destaque (azul ciano neon) |
| Secondary | `#ff6b35` | Destaque secundário (laranja) |
| Text | `#ffffff` | Texto principal |
| Error | `#ff4757` | Mensagens de erro |
| Success | `#2ed573` | Mensagens de sucesso |

### Tipografia
- **Fonte**: JetBrains Mono (monospace)
- **Título**: 28px, bold
- **Labels**: 11px, uppercase, letter-spacing 2px
- **Inputs**: 16px

### Efeitos Visuais
- Borda glow nos campos quando focados
- Transições suaves (0.3s)
- Loading com animação de spinner
- Gradiente sutil no background
- Gradient no título

## ⚡ Funcionalidades

### 1. Máscara de CEP Automática
O campo de CEP formata automaticamente conforme o usuário digita:
- Formato: `XXXXX-XXX`
- Aceita apenas números
- Limite de 9 caracteres

### 2. Busca Automática
A consulta à API é disparada automaticamente após o usuário digitar os 8 dígitos do CEP, com um pequeno delay de 500ms para evitar múltiplas requisições.

### 3. Preenchimento Automático
Os campos de endereço são preenchidos com os dados retornados pela API:
- `logradouro` → Rua
- `bairro` → Bairro
- `localidade` → Cidade
- `uf` → Estado

### 4. Estados de Interface
- **Loading**: Exibe spinner animado durante a consulta
- **Erro**: Mostra mensagem se CEP inválido ou não encontrado
- **Sucesso**: Indica quando o endereço foi encontrado

## 🔌 Integração com API

### Endpoint
```
https://viacep.com.br/ws/{cep}/json/
```

### Método
- **GET**: Requisição simples sem parâmetros adicionais

### Exemplo de Resposta
```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "erro": false
}
```

## 🚀 Como Executar

### Deploy na Vercel (Produção)

Siga os passos abaixo para fazer o deploy do seu projeto na Vercel:

```bash
# 1️⃣ Instalar a CLI do Vercel
npm install -g vercel

# 2️⃣ Fazer login no Vercel
vercel login
# (Ele vai pedir seu e-mail e enviar um link de confirmação)

# 3️⃣ Fazer o deploy
vercel
```

O terminal vai perguntar algumas coisas. Responda:

- Set up and deploy? → **Y**
- Which scope? → **sua conta**
- Link to existing project? → **N**
- Project Name → **buscador-de-cep**
- Directory → **./**

### Atualizar o Deploy

Quando alterar algo no código, basta rodar:

```bash
vercel --prod
```

### Pré-requisitos (Desenvolvimento Local)
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação (Desenvolvimento)

```bash
# Clone o repositório ou extraia os arquivos
cd BuscadorDeCep

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Visualizar Build

```bash
npm run preview
```

## 📄 Decisões de Implementação

### 1. Componentização
O projeto foi implementado em um único componente (`App.jsx`) devido à simplicidade da aplicação. Em projetos maiores, recomenda-se拆分 em componentes menores:
- `CEPInput` - Campo de CEP com máscara
- `AddressFields` - Campos de endereço
- `LoadingSpinner` - Indicador de carregamento
- `ErrorMessage` / `SuccessMessage` - Mensagens de feedback

### 2. Tratamento de Erros
- Verificação de CEP inválido (retorno `erro: true` da API)
- Tratamento de falhas de rede com try/catch
- Limpeza de estados anteriores a cada nova busca

### 3. Performance
- useEffect com debounce de 500ms para evitar múltiplas requisições
- Limpeza do timeout no cleanup do useEffect
- Uso de dependencies corretas no useEffect

### 4. Estilização
- CSS Variables para facilitar manutenção
- Design responsivo com media queries
- Transições suaves para melhor UX

## 📱 Responsividade

O layout é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- **Desktop**: Layout em duas colunas (bairro/estado)
- **Mobile** (< 480px): Layout em coluna única

## 📝 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

Desenvolvido com ❤️ usando React + Vite

