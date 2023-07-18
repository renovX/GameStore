FROM node:16.17.0

WORKDIR /gamestore

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001
# required for docker desktop port mapping

CMD ["npm", "run","dev"]