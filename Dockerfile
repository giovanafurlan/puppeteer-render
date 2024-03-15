# FROM node:16

# # Instalando dependências do Chromium
# RUN apt-get update && apt-get install -y \
#     chromium \
#     fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
#     --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# # Criando um diretório de trabalho
# WORKDIR /app

# # Copiando arquivos de dependência do projeto
# COPY package.json .
# COPY package-lock.json .

# # Instalando dependências
# RUN npm install

# reference https://developers.google.com/web/tools/puppeteer/troubleshooting#setting_up_chrome_linux_sandbox
FROM node:current-alpine

# manually installing chrome
RUN apk add chromium

# skips puppeteer installing chrome and points to correct binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci

# Copiando o restante dos arquivos do projeto
COPY . .

# Expondo a porta do servidor
EXPOSE 4000

# Comando de inicialização do servidor
CMD ["npm", "start"]

# docker build -t puppeteer .
# docker run -p 4000:4000 puppeteer
