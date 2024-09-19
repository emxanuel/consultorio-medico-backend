FROM node:19-bullseye

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g ts-node

RUN npx prisma generate

EXPOSE 80

CMD ["ts-node", "src/index.ts"]