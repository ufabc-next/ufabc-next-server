# ufabc-next-server

[![Build Status](https://travis-ci.com/ufabc-next/ufabc-next-server.svg?branch=master)](https://travis-ci.com/ufabc-next/ufabc-next-server)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4f19e74af1ca4b37ba4a069c70b7e5b5)](https://www.codacy.com/gh/ufabc-next/ufabc-next-server/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ufabc-next/ufabc-next-server&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/ufabc-next/ufabc-matricula-server/branch/master/graph/badge.svg)](https://codecov.io/gh/ufabc-next/ufabc-matricula-server)

### Para executar o server 

- Entrar em ufabc-next-server/app e executar o `yarn install`:
- Instalar o **Docker** e o **Docker Compose**
- Dentro de ufabc-next-server/app, como administrador, executar `docker-compose up -d`
- Para iniciar o servidor, executar como `yarn start:watch` a fim de verificar quando um arquivo for atualizado. Dessa forma, o servidor reiniciará automaticamente

### Testes

- Para popular o Banco de Dados com uma massa de dados padrão, executar o `yarn populate both`
- `yarn test` para executar os testes unitários  

Back-end server in Node.js for UFABC Next services.
