FROM node:19-bullseye-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npx prisma generate

FROM node:19-bullseye-slim

WORKDIR /app

COPY --from=builder /app .

RUN npm install

RUN npm install -g ts-node

EXPOSE 80

CMD ["ts-node", "src/index.ts"]
