FROM node:latest
COPY server.js /node/
WORKDIR /node
RUN npm i winston yaml
ENTRYPOINT ["node", "/node/server.js"]
