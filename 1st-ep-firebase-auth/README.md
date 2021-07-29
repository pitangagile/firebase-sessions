## Firebase Sessions - Ep. 1 Firebase Auth
## Instruções e auxílios para rodar o projeto

### O nosso escopo
- Conhecer um pouco sobre o firebase  Auth
- Autenticar usuários utilizando Firebase Authentication
- Implantar o projeto utilizando Firebase Hosting

### O que será necessário

##### 1) Instalar IDE para desenvolvimento
- [https://code.visualstudio.com/](https://code.visualstudio.com/)

##### 2) Uma conta Google para acessar o Firebase
- [https://console.firebase.google.com](https://console.firebase.google.com)

### Produtos do firebase utilizados no projeto
- Firebase Authentication para permitir que seus usuários façam login facilmente em seu aplicativo.
- Firebase Hosting para hospedar e disponibilizar seus ativos

### Começando
##### 1) Criando o projeto no firebase
- Faça login no Firebase
- No console do Firebase, clique em Adicionar projeto e nomeie seu projeto do Firebase.
- Desmarque Ativar Google Analytics para este projeto
- Clique em Criar projeto 

##### 2) Adicionando app web Firebase ao projeto
- Clique no ícone da web </> para criar um novo app da web do Firebase
- Registre o app com um apelido e marque a caixa para também configurar o Firebase Hosting para esse app
- Clique em registrar app

##### 3) Ativando login do Google para o Firebase Authentication
- Localize a seção "criação" ou "build" do lado esquerdo do painel
- Clique em autenticação e na guia método de login
- Ative o provedor de login desejado e e clique em Salvar
- Defina um nome público do app e escolha um e-mail de suporte
- Configure a tela de consentimento OAuth e adicione uma logo

##### 4) Instalando linha de comando do Firebase
- Execute o comando `npm -g install firebase-tools`
- Verifique se foi instalado `firebase --version`
- Autorize o cli `firebase login`

##### 5) Para rodar o projeto
- Navegue até a pasta do projeto
- Associe o app ao projeto `firebase use --add`
- Execute o app localmente `firebase serve --only hosting`
- A app deve estar disponível em [http://localhost:5000/](http://localhost:5000)

### Hora do código
##### 1) Autenticação
- Implementar cadastro com e-mail
- Implementar login com e-mail 
- Implementar login com o google
- Implementar logout
- Implementar envio de e-mail para verificação

##### 2) Deploy da aplicação
- Implantar aplicação na cloud