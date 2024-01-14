FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npx nx run benmunrome:build --configuration=production

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist/ ./dist/

CMD ["node", "dist/apps/benmunrome/server/server.mjs"]