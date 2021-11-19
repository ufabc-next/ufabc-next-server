# ufabc-next-server

<img alt="GitHub Package.json Version" src="https://img.shields.io/github/package-json/v/ufabc-next/ufabc-next-server" /> <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/ufabc-next/ufabc-next-server" /> ![GitHub repo size](https://img.shields.io/github/repo-size/UFABCNextOps/ufabc-next-server)

[![Build Status](https://scrutinizer-ci.com/g/UFABCNextOps/ufabc-next-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/UFABCNextOps/ufabc-next-server/build-status/master)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c97a33d865fb4b35b257b538f1661ad7)](https://www.codacy.com/gh/UFABCNextOps/ufabc-next-server/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=UFABCNextOps/ufabc-next-server&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/ufabc-next/ufabc-next-server/branch/master/graph/badge.svg)](https://codecov.io/gh/ufabc-next/ufabc-next-server) 
[![Code Coverage](https://scrutinizer-ci.com/g/UFABCNextOps/ufabc-next-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/UFABCNextOps/ufabc-next-server/?branch=master) <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/ufabc-next/ufabc-next-server" />

<img alt="Github License" src="https://img.shields.io/github/license/ufabc-next/ufabc-next-server" />

### Para executar o server 

- Entrar em ufabc-next-server/app e executar o `yarn install`:
- Instalar o **Docker** e o **Docker Compose**
- Dentro de ufabc-next-server/app, como administrador, executar `docker-compose up -d`
- Para iniciar o servidor, executar como `yarn start:watch` a fim de verificar quando um arquivo for atualizado. Dessa forma, o servidor reiniciará automaticamente

### Testes

- Para popular o Banco de Dados com uma massa de dados padrão, executar o `yarn populate both`
- `yarn test` para executar os testes unitários  

Back-end server in Node.js for UFABC Next services.
