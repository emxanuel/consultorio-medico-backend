FROM node:19-bullseye

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g ts-node

RUN npx prisma generate

EXPOSE 80

CMD ["ts-node", "src/index.ts"]