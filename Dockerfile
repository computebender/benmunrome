FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build benmunrome --configuration=production 

FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/angular.json ./

COPY --from=build /app/dist/ ./dist/

CMD ["npm", "run", "serve:ssr:benmunrome"]