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

## O que o sistema fará

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

## API pública prevista

[CheapShark API](https://apidocs.cheapshark.com/), gratuita e sem chave de acesso, para consultar o preço de um jogo pelo título.

## Organização do projeto

- `index.html`: página inicial, com a coleção de jogos
- `pages/`: páginas de cadastro, edição e detalhes
- `assets/`: arquivos de CSS, JavaScript e imagens
