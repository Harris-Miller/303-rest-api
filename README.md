# 303 software homework

### By: Harris Miller

## To Run

`yarn` to install all dependencies
have a running Postgres server with a db named 'blog' and a user 'postgres' that does not require a password
`yarn seed` to add data
`yarn start` to run server
`localhost:3000/articles` will return the whole articles table in JSON
`/articles` is a REST-ful endpoint, so you can `POST /articles` and `GET /articles/:id`, etc...

## Lint

`yarn lint` will eslint the project. I'm not using airbnb's rules. I'm using my own published set, which is based on airbnb's rules, tailered to my own personal preferences, while also being more module to the type of project you're creating (see https://github.com/Harris-Miller/node-eslint-config-harris for details)