FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json next.config.ts ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
