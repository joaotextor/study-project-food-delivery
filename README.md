# <a id="english"></a>A Study Project - Restaurant Order Management

This is a solution to the [Backend Job Offer Exam](https://github.com/thiagocontaparatestes/testes-vaga-emprego/blob/main/teste-backend-lanchonete.md), as part of the [JS Fullstack Course](https://go.hotmart.com/H75713532I) by [Thiago M. Medeiros](https://github.com/thiagommedeiros).

[Veja a versão em Português aqui.](#portuguese)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [How to access the Live Preview](#how-to-access-the-live-preview)
- [Author](#author)

## Overview

### The challenge

In this challenge, the developr should be able to develop an RESTFul API to create orders in a restaurant, with a admin control panel to insert products and manage orders.

The system should contemplate modules for **Customers**, **Products** and **Orders**. An **Order** belongs to a **Customer** and it can have multiple **Products**.

The API will be used by the **Customer** to create **Orders**. It must have endpoints so that the **Customer** can signup, as well as create, list, see and delete **Orders**. One **Customer** must not be able to delete other **Customers**'s orders. To avoid authentication, the **Customer** id should be used as a parameter to perform such actions.

The admin panel should have a basic authentication, and should allow for listing Customers and Orders, as well as managing the Products.

Each entity should have the following input fields:

* Customer: `name`, `email`, `phone` and `address`;
* Product: `name` and `price`;
* Orders: `customer id`, `product id`'s, `creation date` and `order status`;

The Order might have the `status`: `pending`, `preparing`, `delivering`, `delivered` and `cancelled`.

### Links

- Github repository: [https://github.com/joaotextor/study-project-food-delivery](https://github.com/joaotextor/study-project-food-delivery)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Node.js
- MongoDB

### How to access the Live Preview

* Install Node.js
* Install MongoDB
* Install mongoose, express and nodemon.
* Run "npm run dev" in command prompt.
* In browser, access the localhost

## Author

- Github - [João Textor](https://github.com/joaotextor)
- Frontend Mentor - [@joaotextor](https://www.frontendmentor.io/profile/joaotextor)
- Twitter - [@yourusername](https://www.twitter.com/joaotextor90)

# <a id="portuguese"></a>Projeto de Estudo - Gerenciamento de Pedidos de lanchonete

Essa é a solução do [Teste de Vaga de Emprego Backend](https://github.com/thiagocontaparatestes/testes-vaga-emprego/blob/main/teste-backend-lanchonete.md), parte do [Curso Formação FullStack Javascript](https://go.hotmart.com/H75713532I) de [Thiago M. Medeiros](https://github.com/thiagommedeiros).

[See the English version.](#english)

## Conteúdo

- [Visão geral](#visão-geral)
  - [O desafio](#o-desafio)
  - [Links](#linkspt)
- [Meu processo](#meu-processo)
  - [Desenvolvido com](#desenvolvido-com)
- [Como acessar o Live Preview](#como-acessar-o-live-preview)
- [Autor](#autor)

## Visão geral

### O desafio

Para esse desafio, o desenvolvedor deverá mostrar ser capaz de desenvolver uma API RESTFul, para criar pedidos de uma lanchonete, e um painel administrativo para cadastrar os produtos e gerenciar os pedidos.

O Sistema deverá contemplar os módulos: **Cliente** , **Produto** e **Pedido** . Um **Pedido** pertence a um **Cliente** e um **Pedido** contém vários **Produtos** .

A API será utilizada para o *client* que irá realizar os pedidos. Nesse sentido, ela deverá conter *endpoints* para que um **Cliente** possa se cadastrar. Além de `criar`, `listar`, `ver` e `excluir` **Pedidos** de um **Cliente** específico. Obs.: Para evitar autenticação, o id do **Cliente** pode ser usado como parâmetro para realizar essas ações.

O painel administrativo deve conter uma autenticação básica. E através dele deverá ser possível `listar` **Clientes** e `listar` **Pedidos** , além de poder gerenciar os **Produtos** da lanchonete..

Os campos para cada entidade serão:

* Cliente: `nome`, `email`, `telefone` e `endereço`;
* Produto: `nome` e `preço`;
* Pedido: `código do cliente`, `código do produto`, `data de criação` e `status do pedido`.

O **Pedido** poderá conter os `status`: `Pendente`, `Em preparo`, `Em entrega`, `Entregue` e `Cancelado`.

### <a id="linkspt"></a>Links

- Repositório do exercício no Github: [https://github.com/joaotextor/study-project-food-delivery](https://github.com/joaotextor/study-project-food-delivery)

## Meu processo

### Desenvolvido com

- HTML5 semântico
- propriedades CSS personalizadas
- Flexbox
- CSS Grid
- Node.js
- MongoDB


### Como acessar o Live Preview

* Instale o Node.js
* Instale o MongoDB
* Instale o mongoose, express and nodemon.
* Rode o programa com "npm run dev" no prompt de comando.
* No navegador, acesse o localhost na porta 8080.

## Autor

- Github - [João Textor](https://github.com/joaotextor)
- Frontend Mentor - [@joaotextor](https://www.frontendmentor.io/profile/joaotextor)
- Twitter - [@yourusername](https://www.twitter.com/joaotextor90)
