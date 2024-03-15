const puppeteer = require("puppeteer");
require("dotenv").config();
const path = require("path");

const scrapeLogic = async (res, parametro) => {
  // Lista de proxies omitida por brevidade
  const proxyList = [
    "38.162.18.61:3128",
    "38.162.16.4:3128",
    "38.162.21.103:3128",
    "38.162.24.80:3128",
    "38.162.15.116:3128",
    "38.162.0.40:3128",
    "38.162.18.201:3128",
    "38.162.7.189:3128",
    "38.162.4.250:3128",
    "38.162.28.19:3128",
    "38.162.14.14:3128",
    "38.174.40.141:3128",
    "38.162.23.151:3128",
    "38.162.9.62:3128",
    "38.162.17.219:3128",
    "38.162.5.152:3128",
    "38.162.22.138:3128",
    "38.162.27.163:3128",
    "38.162.14.142:3128",
    "38.162.5.97:3128",
    "38.162.7.175:3128",
    "38.162.9.215:3128",
    "38.162.23.61:3128",
    "38.62.220.88:3128",
    "38.162.6.255:3128",
    "38.162.1.185:3128",
    "38.162.10.175:3128",
    "38.162.14.154:3128",
    "38.162.18.72:3128",
    "38.162.27.131:3128",
    "38.162.31.164:3128",
    "38.162.31.99:3128",
    "38.162.1.126:3128",
    "38.162.0.79:3128",
    "38.162.22.214:3128",
    "38.162.11.121:3128",
    "38.162.29.168:3128",
    "38.62.220.223:3128",
    "38.162.31.188:3128",
    "38.162.6.161:3128",
    "38.162.14.182:3128",
    "38.162.7.240:3128",
    "38.162.22.18:3128",
    "38.174.39.20:3128",
    "38.62.223.10:3128",
    "38.162.21.196:3128",
    "38.162.30.125:3128",
    "38.62.222.15:3128",
    "38.162.24.26:3128",
    "38.62.223.175:3128",
    "38.162.19.203:3128",
    "38.162.5.96:3128",
    "38.174.57.174:3128",
    "38.162.20.139:3128",
    "38.162.16.131:3128",
    "38.162.26.255:3128",
    "38.174.57.201:3128",
    "38.62.222.210:3128",
    "38.162.5.83:3128",
    "38.162.7.208:3128",
    "38.62.223.224:3128",
    "38.174.56.91:3128",
    "38.174.56.192:3128",
    "38.162.2.90:3128",
    "38.162.9.225:3128",
    "38.162.20.24:3128",
    "38.162.2.227:3128",
    "38.162.26.177:3128",
    "38.162.22.184:3128",
    "38.162.21.29:3128",
    "38.162.28.226:3128",
    "38.162.1.64:3128",
    "38.162.11.247:3128",
    "38.162.10.165:3128",
    "38.162.10.104:3128",
    "38.162.10.203:3128",
    "38.162.7.47:3128",
    "38.162.13.1:3128",
    "38.162.13.38:3128",
    "38.174.56.224:3128",
    "38.162.21.75:3128",
    "38.162.25.194:3128",
    "38.162.1.99:3128",
    "38.62.223.190:3128",
    "38.174.57.109:3128",
    "38.162.22.46:3128",
    "38.162.20.10:3128",
    "38.162.10.4:3128",
    "38.62.220.234:3128",
    "38.174.57.77:3128",
    "38.162.10.222:3128",
    "38.162.7.90:3128",
    "38.162.24.86:3128",
    "38.162.31.30:3128",
    "38.162.24.173:3128",
    "38.162.27.11:3128",
    "38.162.4.187:3128",
    "38.162.3.187:3128",
    "38.162.31.103:3128",
    "38.162.21.251:3128",
  ];

  // Seleciona aleatoriamente um proxy da lista
  const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];

  const browser = await puppeteer.launch({
    // Configurações do navegador
    // headless: false,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      // "--single-process",
      // "--no-zygote",
      // `--proxy-server=${randomProxy}`,
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    let sobre;
    let funcao;
    let localizacao;
    let experiencias;

    // abre uma nova página
    const page = await browser.newPage();
    console.log("Abre a página");

    // define o tamanho da tela
    await page.setViewport({ width: 2000, height: 2000 });
    console.log("Define o tamanho da tela");

    // redireciona para a página do perfil
    await page.goto(parametro, {
      waitUntil: "networkidle2",
    });
    console.log("Redireciona para a página do perfil");

    // captura uma screenshot da página
    // await page.screenshot({ path: path.resolve(__dirname, "profile.png") });
    // console.log("Captura uma screenshot da página");

    // pega título da página
    const title = await page.title();
    console.log("pega título da página");

    // fecha o modal
    await page.waitForSelector(".modal__dismiss");
    await page.click(".modal__dismiss");
    console.log("fecha o modal");

    // checa se o botão de abrir o sobre existe
    const buttonExists = await page.$(".sign-in-modal__outlet-btn");
    if (buttonExists !== null) {
      // pega conteúdo sobre
      sobre = await page.evaluate(() => {
        const span = document.querySelector(".core-section-container__content");
        if (span) {
          return span.textContent.trim();
        }
        return null;
      });
      console.log("pega conteúdo sobre");
    }
    console.log("checa se o botão de abrir o sobre existe");

    // pega conteúdo função
    funcao = await page.evaluate(() => {
      try {
        const span = document.querySelector(".top-card-layout__headline");
        if (span) {
          return span.textContent.trim();
        }
        throw new Error("Elemento não encontrado");
      } catch (error) {
        return null;
      }
    });
    console.log("pega conteúdo função");

    // pega conteúdo localização
    localizacao = await page.evaluate(() => {
      try {
        const span = document.querySelector(
          "div.not-first-middot span:first-child"
        );
        if (span) {
          return span.textContent.trim();
        }
        throw new Error("Elemento não encontrado");
      } catch (error) {
        return null;
      }
    });
    console.log("pega conteúdo localização");

    // pega conteúdo experiências
    experiencias = await page.evaluate(() => {
      try {
        const experienceItems = document.querySelectorAll(
          'section[data-section="experience"] .experience-item'
        );
        const experiencesArray = [];

        experienceItems.forEach((item) => {
          const empresaElement = item.querySelector(".experience-item__subh1");
          const duracaoElement = item.querySelector(".date-range");
          const localizacaoElement = item.querySelectorAll(
            ".experience-item__meta-item"
          )[1];
          const descricaoElement = item.querySelector(
            ".show-more-less-text__text--less"
          );

          // Verifica se todos os elementos foram encontrados
          if (
            empresaElement &&
            duracaoElement &&
            localizacaoElement &&
            descricaoElement
          ) {
            const empresa = empresaElement.textContent.trim();
            const duracao = duracaoElement.textContent.trim();
            const localizacao = localizacaoElement.textContent.trim();
            const descricao = descricaoElement.textContent.trim();

            experiencesArray.push({
              empresa,
              duracao,
              localizacao,
              descricao,
            });
          } else {
            throw new Error("Elemento não encontrado");
          }
        });

        return experiencesArray;
      } catch (error) {
        return null;
      }
    });
    console.log("pega conteúdo experiências");

    // Retornando a resposta como JSON
    res.json({ title, sobre, funcao, localizacao, experiencias });
  } catch (e) {
    console.error(e);
    res.json({
      message: "Algo deu errado ao executar o Puppeteer, tente novamente.",
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { scrapeLogic };
