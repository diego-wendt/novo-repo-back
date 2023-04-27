# M3P2-BackEnd-Squad1 - Projeto Avaliativo 2 - Connect Lab backend plus

![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2010.0.0-brightgreen.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![NestJS](https://img.shields.io/badge/NestJS-v8.0.0-red)
![TypeORM](https://img.shields.io/badge/TypeORM-v0.2.38-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.2.4-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13.2-blue)
![Swagger](https://img.shields.io/badge/Swagger-v3.0.0-green)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Link da Apresentação

[Apresentação](https://docs.google.com/presentation/d/10ImTKQP3bEXzey7sIvqKbKgau3lLibvx/edit?usp=share_link&ouid=117801574216764995635&rtpof=true&sd=true)

## Link Trello

[Trello](https://trello.com/b/bKr5hG60/m3p2-backend-squad-1)

## Link Repositorio

[GitHub](https://github.com/DEVin-Intelbras/M3P2-BackEnd-Squad1)

## Link Swagger

Swagger http://{SEU IP}:{PORTA PROJETO}/swagger

\*\*\*Obs.: por padrão este projeto esta na porta 3000

## Descrição

Sistema backend do sistema Connect Lab Plus

## Funções

- [x] Login usando JWT
- [x] Cadastro de novos usuarios
- [x] Troca de senha de usuario cadastrado
- [x] Vincular dispositivo com um local
- [x] Detalhes de dispositivos
- [x] Listar dispositivos
- [x] Confirmação de cadastro de usuário via e-mail
- [x] Recebimento de nova senha via e-mail
- [x] Opção utilizar ou não as configurações para acesso ao módulo e-mail
- [x] Criação de dados de sensores temporizada
- [x] Valores realistas dos sensores cadastrados

## Instalação

```bash
git clone https://github.com/DEVin-Intelbras/M3P2-BackEnd-Squad1.git
```

```bash
cd M3P2-BackEnd-Squad1
```

```bash
npm install
```

## Executando aplicação

### Executando migrations

```bash
$ npm run migration:Run
```

### Iniciando aplicação

```bash
# Iniciar
$ npm run start

# Modo Desenvolvedor
$ npm run start:dev

# Modo Produção
$ npm run start:prod
```

### Configurando a aplicação

É necessário configurar a primeira seção do arquivo .ENV para realizar a conexão com o banco de dados, porém, caso o usuário não deseje ter acesso as funções que envolvem o e-mail, não é necessário preencher as informações referentes ao #Nodemailer e #endereço de hospedagem, pois a aplicação vai ignorar estes comandos.

```bash
# POSTGRESQL - EXEMPLO
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres
JWT_SECRET=dsahvfbhuvbibviab

#Nodemailer
MAIL_HOST=smtp.xxxxx.com
MAIL_USER=usuario.de.um.serviço.smtp
MAIL_PASSWORD=senha.fornecida.pelo.serviço.smtp
MAIL_FROM=email.que.vai.aparecer.como.remetente.da.postagem

#Endereço hospedagem backend
URL_BACKEND=url.raiz.da.aplicação.backend
URL_FRONTEND=url.raiz.da.aplicação.frontend

```

## Endpoints

### Locais

#### Criar novo local [locais]

- Metodo
  - POST
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "name": "Name of place",
  "latitude": 10,
  "longitude": 10
}
```

- Response 201

```
{
  "status_code": 201,
  "message": "Place created succssesfully"
}
```

- Response 400

```
{
  "status_code": 400,
  "message": [
    "longitude must not be less than -180",
    "longitude must not be greater than 180",
    "longitude must be a number conforming to the specified constraints",
    "Longitude is required"
  ],
  "error": "Bad Request"
}
```

#### Listagem de locais [locais]

- Metodo
  - GET
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Response 200

```
{
  "status_code": 200,
  "data": {
  "status_code": 200,
  "data": [
    {
      "places_id": "fc19522c-f96a-4fa4-9c1e-81c40262714c",
      "places_name": "Name of place",
      "places_latitude": "10",
      "places_longitude": "10",
      "num_devices": "2"
    },
    {
      "places_id": "fc6a20c3-038d-403f-9df8-ae15b84fe336",
      "places_name": "Name of place 2",
      "places_latitude": "10",
      "places_longitude": "10",
      "num_devices": "0"
    }
  ],
  "message": "Successful query"
},
```

#### Excluir local [/locais/{iDPlace}]

- Metodo
  - DELETE
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Response 200

```
{
  "status_code": 200,
  "message": "Place deleted succssesfully"
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "Place not found."
}
```

#### Edita dados de um local [/locais/{iDPlace}]

- Metodo
  - PUT
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "name": "New name of place",
  "latitude": 0,
  "longitude": 0
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "Place updated succssesfully"
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "Place not found."
}
```

#### Listar dispositivos por local [locais/overview/{iDPlace}]

- Metodo
  - GET
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Response 200

```
{
	"status_code": 200,
	"message": "Succssesfully done",
	"data": {
		"local": "f8dac8b7-a980-40eb-adf7-1d222b261938",
		"overview": [
			{
				"id": 2,
				"type": "temperatura",
				"min_range": -30,
				"max_range": 60,
				"unit": "°C",
				"round": 39
			}
		],
		"dados": [
			{
				"id": "4450144d-3d28-4f5c-959f-1dad9c48fdbc",
				"name": "sensor de agua",
				"type_id": 2,
				"type": "temperatura",
				"unit": "°C",
				"values": [ 40,	40,	40, 30 ],
				"time": [	"04:00", "05:00", "06:00", "07:00" ]
			}
		]
	}
}
```

### Sensores

#### Vincular sensores [sensores/vincular-sensor/{idPlace}]

- Metodo
  - POST
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "name": "Name of company",
  "type_id": "1",
  "mac_address": "001B44113AB7"
}
```

- Response 200

```
{
  "status_code": 201,
  "message": "Device created succssesfully"
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "Place not found.",
  "error": "Place not found"
}
```

#### Desvincular sensores [sensores/desvincular-sensor]

- Metodo
  - POST
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "id_place": "bab8fe56-7c6a-4993-bb88-2c2c28b3d871",
  "id_device": ["eae31547-7a0a-4974-9a61-911a37513dc2",       "eae31547-7a0a-4974-9a61-911a37513dc2"]
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "Device removed succssesfully"
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "Device doesn't exist or is registered to another place."
}
```

#### Lista de sensores [sensores/{idPlace}]

- Metodo
  - GET
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Response 200

```
{
  "status_code": 200,
  "data": [
    {
      "id": "88717c78-e349-4a79-9b1b-f2148e18116e",
      "name": "Sensor Umidificator Philipps Walita",
      "status": true,
      "type": "umidade_do_solo"
    }
  ]
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "Place not found.",
  "error": "Not Found"
}
```

#### Lista de sensores disponiveis [sensores/{idPlace}]

- Metodo
  - POST
- Parametro
  - local
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Response 200

```
{
  "status_code": 200,
  "data": [
            {
              "id": 1,
              "name": "Sensor de Umidade do Solo 1",
              "type": "umidade_do_solo",
              "min_range": 0,
              "max_range": 100,
              "barcode": "123456789",
              "batch": "ABC123",
              unit:"°C"
            }
          ]
}
```

### Empresa

#### Cadastrar uma nova empresa [empresa/cadastro}]

- Metodo
  - POST
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "name": "Name of company",
  "cnpj": "57000980000140",
  "owner": "Name owner of company",
  "mail": "example@example.com",
  "phone": "99999999999",
  "password": "StrongWeekPassword123",
  "confirm_password": "StrongWeekPassword123"
}
```

- Response 200

```
{
  "status_code": 201,
  "message": "Company created succssesfully"
}
```

- Response 409

```
{
  "status_code": 409,
  "message": "The email entered is already registered",
  "error": "Conflict"
}
```

#### Editar dados da empresa [empresa/perfil]

- Metodo
  - PUT
- Headers
  - Content-Type application/json
  - Authorization: Bearer [TOKEN]
- Body

```
{
  "phone": "99999999999",
  "password": "StrongWeekPassword123",
  "confirm_password": "StrongWeekPassword123"
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "succssesfully saved data."
}
```

#### Buscar dados da empresa [empresa/dados]

- Metodo
  - GET
- Headers

  - Content-Type application/json
  - Authorization: Bearer [TOKEN]

- Response 200

```
{
  "phone": "12963852741",
}
```

### Auth

#### Criar token - login [auth/login]

- Metodo
  - POST
- Headers
  - Content-Type application/json
- Body

```
{
  "mail": "example@example.com",
  "password": "StrongWeekPassword123"
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "Login success",
  "data": {
    "id": "12c9c575-fe27-440d-ae11-da8ccfd61f90",
    "mail": "example@example.com",
    "name": "Name of company",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyYzljNTc1LWZlMjctNDQwZC1hZTExLWRhOGNjZmQ2MWY5MCIsIm1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwibmFtZSI6Ik5hbWUgb2YgY29tcGFueSIsImlhdCI6MTY4MTg2NjE2N30.LdMGTerQdnc-eFb0ZKYbDKmUIcBoMcbeGuVeglKo1Ac"
  }
}
```

- Response 400

```
{
  "status_code": 400,
  "message": [
    "password should not be empty",
    "password must be longer than or equal to 8 characters",
    "password must be a string"
  ],
  "error": "Bad Request"
}
```

- Response 401

```
{
  "status_code": 401,
  "message": "Unable to login, invalid password or username"
}
```

#### Troca de senha [auth/esqueci-senha]

- Metodo
  - POST
- Headers
  - Content-Type application/json
- Body

```
{
  "mail": "example@example.com"
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "Mail founded",
  "data": "example@example.com"
}
```

- Response 404

```
{
  "status_code": 404,
  "message": "The email provided is not registered. Please check the email you entered and try again.",
  "error": "Not Found"
}
```

### Dados sensores

#### Salva dados enviados por um sensor [dados-sensor/{idDevice}]

- Metodo
  - POST
- Parametro
  - Id do sensor
- Headers
  - Content-Type application/json
- Body

```
{
  "value": 10
}
```

- Response 200

```
{
  "status_code": 200,
  "message": "Data added sucesscfully"
}
```

### Retornos padrões

#### Acesso não autorizado

- Response 401

```
{
  "status_code": 401,
  "message": "Unauthorized"
}
```

#### Erro interno de servidor

-Response 500

```
{
  "status_code": 500,
  "message": "An internal error occurred",
  "error": "Internal Server Error"
}
```

### Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [NestJS](https://nestjs.com)
- [TypeORM](https://typeorm.io)
- [TypeScript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [Swagger](https://swagger.io)
