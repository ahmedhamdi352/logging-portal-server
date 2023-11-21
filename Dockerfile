FROM node:16.13.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
