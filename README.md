# duel
<h1 align="center">Welcome to Duel 👋</h1>

> Duel is a dynamic gaming platform that lets players engage in real-time battles. Compete against others, showcase your skills, and rise through the ranks in an exhilarating, fast-paced environment. Duel is designed for those who thrive on competition and crave the thrill of victory..# Duel

## Install

> To install packages in both the server and frontend folder:
- cd server
```sh
npm install
```

- cd frontend
```sh
npm install
```

- Do not forget to change .Env variable in both SERVER and FRONTEND before running 
> This repo uses nodemailer, so to use it add your email in the ADMIN_EMAIL and same email security_key in the ADMIN_EMAIL_PASS to send email as admin 
```bash
* SERVER
PORT= 5000
DATABASE_URL=YOUR_DATABASE_URL
ADMIN_EMAIL=YOUR_EMAIL
ADMIN_EMAIL_PASS=YOUR_EMAIL_SECURITYKEY
REDIS_HOST=localhost || if you are using any cloud service
APP_URL=http://localhost:5000
CLIENT_APP_URL=http://localhost:3000
JWT_SECRET=use your jwt secret

* FRONTEND
APP_URL=http://localhost:3000
BACKEND_APP_URL=http://localhost:5000

NEXTAUTH_URL=http://localhost:3000
- Update NEXTAUTH_SECRET
NEXTAUTH_SECRET=use your NEXTAUTH_SECRET 
```

- To run this repo locally on your machine use Docker for both **Redis** and **PostgreSql**
```sh
- Docker command for Redis
docker pull redis:latest
docker run -d --name redis-container -p 6379:6379 -p 8001:8001 redis:latest

- Check the container id
docker ps

- Start the container
docker start CONTAINER ID
```

## Usage

- To run the server 
```sh
npm run dev
```
- For frontend 
```sh
npm run dev
```

## Run tests

```sh
npm run test
```

## Author

👤 **Suryakanta Das**

* Github: [@surya-situ](https://github.com/surya-situ)