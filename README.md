# Escala 12x36

Aplicativo web para gerenciamento de escalas de trabalho no formato 12x36, desenvolvido com Angular.

## 📋 Descrição

O **Escala 12x36** é uma ferramenta destinada a facilitar o planejamento e controle de jornadas de trabalho no regime 12x36, comum em áreas como saúde, segurança e indústria.  
O sistema permite a criação, visualização e gerenciamento de escalas de forma eficiente e intuitiva.

## 🚀 Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/marcosaviz/escala-12x36.git
   cd escala-12x36

## Instale as dependências:
npm install
Este comando irá:

Ler os arquivos package.json e package-lock.json.
Baixar e instalar todas as dependências necessárias.
Criar a pasta node_modules com todos os pacotes necessários para o projeto.

## Execute o aplicativo:
ng serve
O aplicativo estará disponível em http://localhost:4200/

## Solução de Problemas
Caso encontre erros durante a instalação ou execução, siga os passos abaixo para limpar o ambiente e reinstalar as dependências:
Remova a pasta node_modules e o arquivo package-lock.json:

bash

rm -rf node_modules
rm package-lock.json
Limpe o cache do npm:

bash

npm cache clean --force
Reinstale as dependências:

bash

npm install

## Estrutura do Projeto
📁 Estrutura do Projeto
bash

escala-12x36/
├── src/                 # Código-fonte do aplicativo
├── public/              # Arquivos públicos
├── .vscode/             # Configurações do Visual Studio Code
├── angular.json         # Configuração do Angular CLI
├── package.json         # Dependências e scripts do projeto
├── tsconfig.json        # Configuração do TypeScript
└── README.md            # Documentação do projeto
📄 Licença
Este projeto está licenciado sob a MIT License.