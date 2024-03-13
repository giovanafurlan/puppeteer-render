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
      "--single-process",
      "--no-zygote",
      `--proxy-server=${randomProxy}`,
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    let h1;
    let sobre;
    let funcao;
    let localizacao;
    let experiencias;

    console.log("parametro", parametro);

    // Abre uma nova página
    const page = await browser.newPage();
    console.log("Abre a página");

    // Define o tamanho da tela
    await page.setViewport({ width: 1500, height: 800 });
    console.log("Define o tamanho da tela");

    // // Navega para o LinkedIn
    // await page.goto("https://www.linkedin.com/signup", {
    //   waitUntil: "load",
    //   // Remove the timeout
    //   timeout: 0,
    // });
    // console.log("Espera o LinkedIn");

    // await page.goto("https://www.linkedin.com/signup");
    // console.log("Navega para o LinkedIn");

    // // Obtém o texto do link "Sign in"
    // const signInLinkText = await page.evaluate(() => {
    //   const signInLink = document.querySelector(
    //     ".main__sign-in-container a.main__sign-in-link"
    //   );
    //   return signInLink ? signInLink.textContent.trim() : null;
    // });

    // if (signInLinkText === "Sign in" || "Entrar") {
    //   // Se o texto do link for "Sign in", então clica no link
    //   await page.click(".main__sign-in-container a.main__sign-in-link");
    //   console.log('Clicou no link "Sign in" || "Entrar"');
    // } else {
    //   console.log('Não encontrou o link "Sign in" || "Entrar"');
    // }

    // // Captura uma screenshot da página
    // await page.screenshot({ path: path.resolve(__dirname, "sign.png") });

    // // Obtém o título da página
    // const h1 = await page.h1();
    // console.log("Obtém o título da página");

    // // Aguarda até que o seletor do campo de entrada esteja disponível na página
    // await page.waitForSelector('input[name="session_key"]');
    // console.log(
    //   "Aguarda até que o seletor do email esteja disponível na página"
    // );

    // // Digita o endereço de e-mail no campo de entrada
    // await page.type(
    //   'input[name="session_key"]',
    //   "backupgiovanafurlan@outlook.com"
    // );
    // console.log("Digita o endereço de e-mail no campo de entrada");

    // // Aguarda até que o seletor do campo de entrada esteja disponível na página
    // await page.waitForSelector('input[name="session_password"]');
    // console.log(
    //   "Aguarda até que o seletor da senha esteja disponível na página"
    // );

    // // Preenche o campo de senha
    // await page.type('input[name="session_password"]', "Fur0412*");
    // console.log("Preenche o campo de senha");

    // // Clica no botão de login
    // // await page.click('button[aria-label="Sign in"]');
    // // console.log("Clica no botão de login");
    // const signButtonText = await page.evaluate(() => {
    //   const signInButton = document.querySelector(
    //     ".login__form_action_container button.btn__primary--large"
    //   );
    //   return signInButton ? signInButton.textContent.trim() : null;
    // });

    // if (signButtonText === "Sign in" || "Entrar") {
    //   // Se o texto do link for "Sign in", então clica no link
    //   await page.click(
    //     ".login__form_action_container button.btn__primary--large"
    //   );
    //   console.log('Clicou no link "Sign in" || "Entrar"');
    // } else {
    //   console.log('Não encontrou o link "Sign in" || "Entrar"');
    // }

    // Redireciona para a página do perfil
    // Navega para o LinkedIn
    await page.goto(parametro, {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    console.log("Espera o LinkedIn");

    // await page.goto(parametro);
    // console.log("Redireciona para a página do perfil");

    // Obtém o título da página
    // const title = await page.title();
    // console.log("Obtém o título da página");

    // pegar conteúdo h1
    // h1 = await page.evaluate(() => {
    //   const h1 = document.querySelector(".top-card-layout__h1");
    //   if (h1) {
    //     return h1.textContent.trim();
    //   }
    //   return null;
    // });
    // console.log("pegar conteúdo h1");

    // Captura uma screenshot da página
    await page.screenshot({ path: path.resolve(__dirname, "profile.png") });

    // pegar conteúdo sobre
    sobre = await page.evaluate(() => {
      const span = document.querySelector(".core-section-container__content");
      if (span) {
        return span.textContent.trim();
      }
      return null;
    });
    console.log("pegar conteúdo sobre");

    // pegar conteúdo função
    funcao = await page.evaluate(() => {
      const span = document.querySelector(".top-card-layout__headline");
      if (span) {
        return span.textContent.trim();
      }
      return null;
    });
    console.log("pegar conteúdo função");

    // pegar conteúdo localização
    localizacao = await page.evaluate(() => {
      const span = document.querySelector(
        "div.not-first-middot span:first-child"
      );
      if (span) {
        return span.textContent.trim();
      }
      return null;
    });
    console.log("pegar conteúdo localização");

    // pegar conteúdo experiências
    experiencias = await page.evaluate(() => {
      const experienceItems = document.querySelectorAll(
        'section[data-section="experience"] .experience-item'
      );
      console.log("experienceItems");
      const experiencesArray = [];

      experienceItems.forEach((item) => {
        console.log("item");
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
          console.log("empresa");
          const empresa = empresaElement.textContent.trim();
          console.log("duracao");
          const duracao = duracaoElement.textContent.trim();
          console.log("localizacao");
          const localizacao = localizacaoElement.textContent.trim();
          console.log("descricao");
          const descricao = descricaoElement.textContent.trim();

          experiencesArray.push({
            empresa,
            duracao,
            localizacao,
            descricao,
          });
          console.log("experiencesArray");
        }
      });

      return experiencesArray;
    });
    console.log("pegar conteúdo experiências");

    // Retornando a resposta como JSON
    res.json({ h1, sobre, funcao, localizacao, experiencias });
  } catch (e) {
    console.error(e);
    res.send(`Algo deu errado ao executar o Puppeteer: ${e}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { scrapeLogic };
