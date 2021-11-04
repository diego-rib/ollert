# Projeto Ollert

Boas vindas ao Ollert, seu aplicativo para lista de tarefas *"nunca"* antes visto.

## Objetivos:

O objetivo projeto é ajudar as pessoas colaboradoras da empresa Ebyrt com o controle e organização de suas tarefas individuais.

## Pré-requisitos para rodar a aplicação:

#### Caso não os tenha instalados é só clicar no link. ;)

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [ ] [MongoDB](https://docs.mongodb.com/manual/installation/)

- É necessário para iniciar a aplicação que seu **MongoDB** esteja rodando e para verificar isso digite o seguinte comando no terminal:
`sudo service mongod status`
E caso na resposta a propriedade **Active** não esteja como *Active(running)* basta digitar o comando:
`sudo service mongod start`
E estamos prontos para instalar o projeto.

## Como rodar a aplicação

1. Primeiro clone o repositório utilizando o comando 
`git clone git@github.com:diego-rib/ollert.git`

2. Em seguida vá para a pasta do projeto com
`cd ollert`

#### Vamos começar rodando o Backend da aplicação, que é onde ficarão armazenadas as tarefas:

1. Vá para a pasta do Backend
`cd backend`

2. E instale as dependências usando
`npm install`

3. Agora é só rodar o comando:
`npm start`
- E o Backend da aplicação já estará rodando! :D

#### Agora para rodar e Frontend e sua aplicação estar pronta para o uso basta:

1. Abrir um outro terminal (para que o Backend continue rodando no que já estava aberto) e acessar a pasta do projeto novamente

2. Em seguida, navegar para a pasta do Frontend
`cd frontend` 
3. Instalar as dependências
`npm install`
4. E partir para o controle e organização de suas tarefas rodando o comando
`npm start`
- Assim que seu navegador abrir a aplicação já estará de pé e pronta para uso! :D


## Funcionalidades da aplicação

A aplicação conta com um CRUD  de 'cards' onde são exibidas as tarefas.
Estas sendo separadas em colunas a depender de seu estado: ''pendente, 'em progresso' e 'concluída'.
O usuário pode criar novas tarefas, editar e excluir as existentes.


## Como rodar os testes

#### Aqui seguem as instruções para rodar os testes:

- [Backend](https://github.com/diego-rib/ollert/blob/main/backend/README.md)
- [Frontend](https://github.com/diego-rib/ollert/blob/main/frontend/README.md)
