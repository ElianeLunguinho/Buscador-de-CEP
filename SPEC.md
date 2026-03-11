# Buscador de CEP - Especificação do Projeto

## 1. Visão Geral do Projeto
- **Nome:** BuscadorDeCep
- **Tipo:** Aplicação Web (React)
- **Funcionalidade Principal:** Busca automática de endereço através do CEP usando a API ViaCEP
- **Usuários Alvo:** Desenvolvedores que precisam de formulário de endereço automatizado

## 2. Especificação UI/UX

### Estrutura de Layout
- **Container central** com largura máxima de 500px
- **Header** com título e descrição
- **Card principal** contendo:
  - Campo de CEP com máscara automática
  - Campos de endereço (rua, bairro, cidade, estado)
  - Indicador de loading
  - Mensagem de erro

### Design Visual
- **Paleta de cores:**
  - Background: #0f0f0f (preto escuro)
  - Card: #1a1a1a (cinza escuro)
  - Primary: #00d9ff (azul ciano neon)
  - Secondary: #ff6b35 (laranja)
  - Text: #ffffff (branco)
  - Muted: #888888 (cinza)
  - Error: #ff4757 (vermelho)
  - Success: #2ed573 (verde)
  
- **Tipografia:**
  - Font: 'JetBrains Mono', monospace
  - Título: 28px, bold
  - Labels: 12px, uppercase, letter-spacing 2px
  - Inputs: 16px

- **Efeitos:**
  - Borda glow no campo de CEP quando focado
  - Transições suaves (0.3s)
  - Loading com animação de pulsar
  - Sutil gradient no header

### Componentes
1. **CEPInput** - Campo com máscara (XXXXX-XXX)
2. **AddressFields** - Campos de endereço desabilitados para edição
3. **LoadingSpinner** - Indicador de carregamento
4. **ErrorMessage** - Mensagem de erro estilizada

## 3. Especificação de Funcionalidades

### Funcionalidades Principais
1. **Máscara de CEP automático** - Formata enquanto digita (XXXXX-XXX)
2. **Busca automática** - Dispara após digitar 8 dígitos
3. **Preenchimento automático** - Preenche rua, bairro, cidade e estado
4. **Loading state** - Mostra indicador enquanto busca
5. **Tratamento de erros** - Exibe mensagem se CEP inválido ou não encontrado

### Fluxo de Funcionamento
1. Usuário digita o CEP
2. Sistema aplica máscara automaticamente
3. Após 8 dígitos, faz chamada para API ViaCEP
4. Exibe loading enquanto espera resposta
5. Preenche campos com dados retornados ou exibe erro

### API Integration
- **Endpoint:** `https://viacep.com.br/ws/{cep}/json/`
- **Método:** GET
- **Response parsing:** 
  - logradouro → Rua
  - bairro → Bairro
  -.localidade → Cidade
  - uf → Estado

## 4. Critérios de Aceitação
- [x] Campo de CEP aceita apenas números
- [x] Máscara é aplicada automaticamente (XXXXX-XXX)
- [x] Busca é disparada automaticamente após 8 dígitos
- [x] Campos são preenchidos com dados da API
- [x] Loading é mostrado durante a busca
- [x] Erro é exibido se CEP inválido
- [x] Interface é responsiva
- [x] Design é moderno e profissional

