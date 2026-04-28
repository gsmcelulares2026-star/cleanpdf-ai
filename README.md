<div align="center">
<img width="1200" height="475" alt="CleanPDF AI Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CleanPDF AI

Uma aplicação web inteligente para limpeza e extração de texto de PDFs usando IA e algoritmos avançados de processamento de documentos.

## ✨ Funcionalidades

- **Extração Inteligente de Texto**: Extrai texto de PDFs preservando a estrutura e formatação
- **Limpeza Automática**: Remove cabeçalhos repetitivos, rodapés, números de página e artefatos de layout
- **IA com Gemini**: Usa Google Gemini 2.0 Flash para refinar e estruturar o texto extraído
- **Níveis de Limpeza**: Básico, Balanceado e Agressivo para diferentes necessidades
- **Interface Moderna**: UI responsiva com animações suaves usando React e Tailwind CSS
- **OCR Integrado**: Suporte a reconhecimento óptico de caracteres com Tesseract.js
- **Exportação**: Baixe o texto limpo em formato Markdown

## 🚀 Tecnologias

- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion (animações)
- **Backend**: Node.js, Express, Vite
- **IA**: Google Generative AI (Gemini 2.0 Flash)
- **PDF Processing**: PDF.js, Tesseract.js
- **Build**: Vite, ESBuild

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Chave da API do Google Gemini

## 🛠️ Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd cleanpdf-ai
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Copie `.env.example` para `.env` (se existir) ou crie um arquivo `.env`
   - Adicione sua chave da API do Gemini:
     ```
     GEMINI_API_KEY=sua-chave-aqui
     ```

4. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Abra no navegador**:
   - Acesse `http://localhost:3000`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila a aplicação para produção
- `npm run start` - Executa a aplicação em modo produção
- `npm run preview` - Visualiza a build de produção
- `npm run clean` - Remove a pasta `dist`
- `npm run lint` - Executa verificação de tipos TypeScript

## 🏗️ Estrutura do Projeto

```
cleanpdf-ai/
├── src/
│   ├── App.tsx              # Componente principal da aplicação
│   ├── main.tsx             # Ponto de entrada React
│   ├── index.css            # Estilos globais
│   └── lib/
│       ├── pdf-utils.ts     # Utilitários para processamento de PDF
│       └── cleaning-utils.ts # Algoritmos de limpeza de texto
├── server.ts                # Servidor Express com API Gemini
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Como Usar

1. **Upload do PDF**: Clique em "Selecionar PDF" ou arraste um arquivo PDF
2. **Configurações**: Escolha o nível de limpeza e se deseja usar IA
3. **Processamento**: Aguarde a extração e limpeza automática
4. **Resultado**: Visualize o texto limpo e faça download em Markdown

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📄 Licença

Este projeto está licenciado sob a Licença Apache 2.0 - veja o arquivo LICENSE para detalhes.

## 🔗 Links

- [Google AI Studio](https://ai.studio/apps/0e596610-293f-4ed2-992e-2490ce4ed8ea)
- [Documentação Google Generative AI](https://ai.google.dev/docs)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Tesseract.js](https://tesseract.projectnaptha.com/)
