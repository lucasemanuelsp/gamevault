# GameVault

Sistema web para organizar a coleção de jogos de uma pessoa. Ele permite registrar os jogos que ela possui, está jogando, já zerou ou quer jogar, acompanhando o status, a nota pessoal e as horas jogadas de cada um.

## Entidade principal

**Jogo**, com as seguintes informações:

- título
- plataforma
- gênero
- status (quero jogar, jogando ou zerado)
- nota de 0 a 10
- horas jogadas
- comentário

## O que o sistema faz

- cadastrar um novo jogo
- visualizar os jogos cadastrados
- visualizar os detalhes de um jogo
- editar um jogo
- excluir um jogo
- pesquisar jogos pelo título
- filtrar jogos por plataforma e status
- ordenar jogos por título, nota ou horas jogadas
- armazenar os dados no localStorage e recuperá-los ao abrir a aplicação novamente
- consumir uma API pública para consultar o preço de um jogo

## API pública utilizada

[CheapShark API](https://apidocs.cheapshark.com/), gratuita e sem chave de acesso, para buscar jogos pelo nome, preencher título e capa no cadastro e consultar o menor preço atual na página de detalhes.

## Como usar

Abra o `index.html` no navegador (ou o site publicado no GitHub Pages). Os jogos ficam salvos no `localStorage` do navegador, então continuam na lista depois de recarregar a página.

## Tecnologias

HTML, CSS e JavaScript puro, com `localStorage` e a CheapShark API.

## Organização do projeto

- `index.html`: página inicial, com a coleção de jogos
- `pages/`: páginas de cadastro, edição e detalhes
- `assets/css/`: estilos
- `assets/js/`: JavaScript (`script.js` com funções compartilhadas e o `localStorage`, `api.js`, `lista.js`, `cadastro.js`, `editar.js` e `detalhes.js`)
- `assets/img/`: imagens