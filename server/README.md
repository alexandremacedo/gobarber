<h1 align="center">
  <img alt="gobarber" title="gobarber" src="../.github/gobarber-icon.png" width="200px" />
</h1>

<h3 align="center">
  GoBarber server - Api for web and mobile applications
</h3>

<h4 align="center">
  NodeJS + Docker + Celebrate + Rate Limiter Flexible
</h4>
</br>


<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexandreMacedoo/gobarber?color=%2304D361">

  <a href="https://github.com/AlexandreMacedoo">
    <img alt="Made by Alexandre" src="https://img.shields.io/badge/made%20by-Alexandre-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/AlexandreMacedoo/gobarber/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/AlexandreMacedoo/gobarber?style=social">
  </a>
</p>

<p align="center">
  <a href="#pré-requisitos">Pré requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">Licença</a>
</p>


# Gobarber server
Gobarber server is an api for scheduling services build with Node.js


## Pré requisitos

- Git (https://git-scm.com/)
- Yarn (https://yarnpkg.com/lang/en/)
- Node (https://nodejs.org/en/)
- Docker (https://www.docker.com/products/docker-desktop)

## How to use
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/AlexandreMacedoo/gobarber.git

# Go into the repository
$ cd gobarber/server

# Install all dependencies
$ yarn

# With docker up
$ docker run --name postgres_gobarber -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
$ docker run --name mongo_gobarber -p 27017:27017 -d -t mongo
$ docker run --name redis_gobarber -p 6379:6379 -d -t redis:alpine

# Start database
$ yarn docker:start

# Running migrations
$ yarn typeorm migrate:run

# Start the server
$ yarn dev:server

# Server is running at http://localhost:3333
```

## Endpoints
Routes:

Method | Endpoint | Controller | Action | Authentication
--- | --- | --- | --- | ---
POST   | /sessions                        | \src\modules\users\infra\http\controllers\SessionController                         | store      | no
POST   | /password/forgot                 | \src\modules\users\infra\http\controllers\ForgotPasswordController                  | store      | no
POST   | /password/reset                  | \src\modules\users\infra\http\controllers\ResetPasswordController                   | store      | no
POST   | /users                           | \src\modules\users\infra\http\controllers\UsersController                           | store      | no
PATCH  | /users/avatar                    | \src\modules\users\infra\http\controllers\UserAvatarController                      | update     | yes
PUT    | /profile                         | \src\modules\users\infra\http\controllers\ProfileController                         | update     | yes
GET    | /profile                         | \src\modules\users\infra\http\controllers\ProfileController                         | list one   | yes
POST   | /appointments                    | \src\modules\appointements\infra\http\controllers\AppointmentsController            | store      | yes
POST   | /appointments/me                 | \src\modules\appointements\infra\http\controllers\ProviderAppointmentsController    | list all   | yes
GET    | /providers                       | \src\modules\appointements\infra\http\controllers\ProvidersController               | list all   | yes
GET    | /providers/:id/month-avaiability | \src\modules\appointements\infra\http\controllers\ProviderDayAvailabilityController | list all   | yes
GET    | /providers/:id/month-avaiability | \src\modules\appointements\infra\http\controllers\ProviderDayAvailabilityController | list all   | yes


## Doc API
- Soon

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
