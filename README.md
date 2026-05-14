# Backend - Sistema de Academia

Backend desenvolvido com Node.js, Express, Sequelize, SQLite, JWT e bcrypt.

## Requisitos

- Node.js instalado
- npm instalado

## Instalar dependências

```npm install``` 

## Criar .env (linux)

```cp .env_example .env```

## Criar banco e dados iniciais
```npm run seed```

## Rodar o projeto em desenvolvimento
```npm run dev```

### Sevidor iniciado em : ```http://localhost:3001```

## Para testar login

```POST http://localhost:3001/auth/login```

Body: 
```
{
"login": "admin",
"senha": "123456"
}
```
Então você guarda token e passa via header para seus testes:

```
Authorization : Bearer <token_aqui>
```
