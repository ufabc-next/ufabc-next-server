# ufabc-next-server

[![Build Status](https://travis-ci.com/ufabc-next/ufabc-matricula-server.svg?branch=master)](https://travis-ci.com/ufabc-next/ufabc-matricula-server)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c6cd37818d9c4ab6b244bfefd5b83597)](https://www.codacy.com/app/fesnt/ufabc-matricula-server?utm_source=github.com&utm_medium=referral&utm_content=ufabc-next/ufabc-matricula-server&utm_campaign=Badge_Grade)
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
