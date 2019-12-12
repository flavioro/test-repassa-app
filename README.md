# Test Repassa APP

## Instalação

**NOTA:** Para executar qualquer um dos comandos abaixo, é imprescindível ter o gerenciador de dependencia NPM instalado globalmente em seu computador, e nagevar para dentro do diretório root da aplicação para que todos os comandos possam ser executados com sucesso.

### Instalação local

Para fazer a instalação de todas as dependencias da aplicação, execute a seguinte linha de comando no terminal.

    npm install

**Nota**: Se após a intalação você receber informações de vulnerabilidades nas dependencias instaladas, execute o seguinte comando para corrigir eventuais vulnerabilidades.

    npm audit fix && npm audit fix --force

### Modo desenvolvimento

Os arquivos do código fonte da aplicação estão contidos dentro do diretório `./src`.
Após concluir a instalação de todas as dependencias da aplicação, é possível executar o comando de desenvolvimento no terminal.

    npm run dev

Depois de executar o comando acima, abra [http://localhost:3000](http://localhost:3000) para renderizar a aplicação no seu browser preferido.
A página será recarregada sempre que fizer edições no seu código fonte, você também verá quaisquer eventuais erros no código no seu console e no próprio browser.

### Construção - Compilar

Este comando cria os arquivos de produção dentro do diretório `./build`. Os arquivos de produção são compilados para a versão ES5 do JS.
Para construir a aplicação em modo producão, execute o seguinte comando:

    npm run build

### Modo produção

Este comando cria os arquivos de produção dentro do diretório ./build e iniciar um servidor Express para servir a aplicação em questão. Os arquivos de produção são transpilados e minificados para obter uma melhor performance e otimização de trafego de dados ao acessar a aplicação. Para construir a aplicação em modo producão, execute o seguinte comando

    npm run start

**Nota:** Por motivos de segurança, os browsers não suportam a metodologia push state do React. Para que você consiga acessar a aplicação em questão em modo produção, eu disponibilizei a mesma no seguinte link: [https://repassa-app.herokuapp.com](https://repassa-app.herokuapp.com).
Se você possui um servidor local capaz de executar aplicações web, e quiser buildar o projeto com o comando npm run build, não se esqueça de ajustar o caminho relativo no arquivo ./package.json na propriedade homepage:

## Uso da aplicação

### Área de Administrador

Para acessar e administrar os funcionários, é preciso acessar a área de admin `/admin` da aplicação, ou seja, [https://repassa-app.herokuapp.com/admin](https://repassa-app.herokuapp.com/admin). Na área de admin, é possível criar, listar, atualizar e deletar(CRUD) funcionários. Além disso, você pode adicionar ou não um feedback para um funcionário, desta forma, quando o funcionário acessar o painel de usuário comum com o respectivo login, ele terá acesso a este feedback adicionado pelo administrador da aplicação.

Área de Administrador: [https://repassa-app.herokuapp.com/admin](https://repassa-app.herokuapp.com/admin)

### Área do usuário

Na área de usuário, é necessário fazer o login com o própro nome de login cadastrado para cada usuário. Para acessar a área de usuário comum, basta acessar a url padrão da aplicação. Após o usuário entrar com o seu login, ele sera redirecionado para a URL [https://repassa-app.herokuapp.com/user/panel](https://repassa-app.herokuapp.com/user/panel). Se você tentar acessar a área do painel de usuário diretamente com a URL [https://repassa-app.herokuapp.com/user/panel](https://repassa-app.herokuapp.com/user/panel) você será ejetado para a página de login, isso porque é necessário informar o login de usuário para ter acesso ao feedback específico.

Você pode criar seu próprio login atravez da área de admin, ou pode acessar o painel de usuário comum com o seguinte login de teste: **lica**

Área do usuário: [https://repassa-app.herokuapp.com/](https://repassa-app.herokuapp.com/)

Eu fiz um deploy da aplicação no Heroku. Para acessar a aplicação em modo produção online basta acessar o seguinte link:

[https://repassa-app.herokuapp.com](https://repassa-app.herokuapp.com)

## Metodologia e arquitetura

Levando em consideração que menos é mais(code clean), acredito que não seja necessário a implementação de uma biblioteca como o Redux nesta aplicação, visando mantê-la a mais enxuta possível em todos os níveis. Até cogitei implementar a metodologia Flux, para que os módulos/componentes pudessem se comunicar entre si, mas ao invés disso, utilizei as técnicas de fluxo de dados unidirecional(one-way data flow) do React mantendo tudo rápido e modular. Fazendo uma analogia, é como se a arquitetura da aplicação fosse uma fonte de água, onde o fluxo de água escorre de cima para baixo(elevate state). Tudo aqui é dividido em componentes/styles e suas responsabilidades, ou seja, cada "pedaço" da aplicacão, por menor que seja, foi componentizada, tanto os arquivos JSX quanto os SCSS.

## Principais tecnologias integradas

- [x] ESlint.
- [x] Express.
- [x] Git.
- [x] JavaScript.
- [x] JSX.
- [x] SCSS.
- [x] Babel.
- [x] React.
- [x] Nodejs.
- [x] NPM.
- [x] Axios.
- [x] Prop-types.
- [x] Loading-skeleton.
