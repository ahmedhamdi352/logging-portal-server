FROM node:16.13.2

WORKDIR /app

COPY package*.json ./

RUN npm install

# Move .env.example to .env
COPY .env.example .env

COPY . .

RUN npm run build

EXPOSE 5000

# Command to run the application
CMD ["pm2-runtime", "start", "build/server.js", "--name", "logging-server-app"]
