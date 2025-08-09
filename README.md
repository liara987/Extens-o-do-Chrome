# Form Filler BR

**Extensão para Google Chrome que gera dados brasileiros falsos e preenche formulários automaticamente, agilizando testes e preenchimento manual.**

---

## 🚀 Funcionalidades

- Geração automática de dados brasileiros reais (nome, CPF, RG, endereço, telefone, email, etc.) via API 4Devs.  
- Preenchimento inteligente de campos de formulário: inputs de texto, selects, radio buttons e checkboxes.  
- Suporte para campos de nome completo, nome separado (primeiro nome e sobrenome), data de nascimento, sexo/gênero, endereço, contatos, e muito mais.  
- Compatível com a maioria dos formulários padrão brasileiros.  
- Interface simples: basta clicar no botão da extensão para preencher o formulário ativo.  

---

## 🛠️ Instalação

1. Clone este repositório ou baixe o código ZIP.  
2. Abra o Chrome e acesse `chrome://extensions/`.  
3. Ative o **Modo do desenvolvedor** no canto superior direito.  
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.  
5. A extensão aparecerá na barra de ferramentas do Chrome pronta para uso.  

---

## ⚙️ Como usar

- Navegue até qualquer página com formulário brasileiro.  
- Clique no ícone da extensão para preencher automaticamente os campos com dados fake gerados.  
- Caso queira customizar, é possível modificar o código fonte conforme a necessidade.  

---

## 🔧 Desenvolvimento

- O código principal está em `popup.js` (ação do botão) e `content.js` (preenchimento do formulário).  
- Utiliza API REST do 4Devs para gerar dados reais em formato JSON.  
- Scripts injetam os dados no formulário via `window.postMessage`.  
- Arquivo `util.js` contém funções auxiliares como formatação de data e separação de nomes.  

---

## 📦 Tecnologias

- JavaScript moderno (ES6+)  
- Manifest V3 do Chrome Extensions  
- Fetch API para requisições HTTP  
- API de Scripting do Chrome para injeção de código  

---

## 💡 Boas práticas adotadas

- Código modular e organizado em funções pequenas.  
- Tratamento de erros e logs para facilitar debug.  
- Normalização e validação de dados antes do preenchimento.  
- Comentários claros e padronizados.  

---

## 🤝 Contribuições

Contribuições são bem-vindas!  
Abra issues para reportar bugs ou sugerir melhorias.  
Faça fork do projeto, crie branches de recurso e envie pull requests.

---

## Contato

[Seu nome ou usuário GitHub] — [seuemail@exemplo.com]  
[GitHub](https://github.com/liara987) | [LinkedIn](https://www.linkedin.com/in/liara-programadora/) | [Youtube](https://www.youtube.com/@LiaraProgramadora)
