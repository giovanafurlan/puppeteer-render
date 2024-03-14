FROM ghcr.io/puppeteer/puppeteer:19.7.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    NODE_ENV=production

WORKDIR /usr/src/app

# Copiando o arquivo package.json separadamente para aproveitar o cache do Docker
COPY package*.json ./

# Instalando as dependências
RUN npm ci

# Copiando os arquivos do projeto para dentro do contêiner
COPY . .

# Expondo a porta 4000
EXPOSE 4000

# Comando para iniciar o servidor
CMD [ "node", "index.js" ]
