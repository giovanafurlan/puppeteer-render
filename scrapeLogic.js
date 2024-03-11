const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    let sobre;
    let funcao;
    let localizacao;
    let experiencias;

    // aguarda até que o elemento esteja disponível na página
    await page.waitForSelector(".main__sign-in-link");

    // clica no link usando o seletor CSS
    await page.click(".main__sign-in-link");

    // preencher o campo de e-mail
    await page.type(
      'input[name="session_key"]',
      "backupgiovanafurlan@outlook.com"
    );

    // preencher o campo de senha
    await page.type('input[name="session_password"]', "Fur0412*");

    // clicar no botão de login
    await page.click('button[aria-label="Sign in"]');

    // aguardar um pouco para permitir que a página seja carregada completamente após o login
    await page.waitForTimeout(5000); // Ajuste o tempo conforme necessário

    // redirecionar para a página do perfil
    await page.goto("https://www.linkedin.com/in/giovana-furlan/");

    // pegar título
    const title = await page.title();

    // pegar conteúdo sobre
    sobre = await page.evaluate(() => {
      const span = document.querySelector(".core-section-container__content");
      if (span) {
        return span.textContent.trim();
      }
      return null;
    });

    // pegar conteúdo função
    funcao = await page.evaluate(() => {
      const span = document.querySelector(".top-card-layout__headline");
      if (span) {
        return span.textContent.trim();
      }
      return null;
    });

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

    // pegar conteúdo experiências
    experiencias = await page.evaluate(() => {
      const experienceItems = document.querySelectorAll(
        'section[data-section="experience"] .experience-item'
      );
      const experiencesArray = [];

      experienceItems.forEach((item) => {
        const empresa = item
          .querySelector(".experience-item__subtitle")
          .textContent.trim();
        const duracao = item.querySelector(".date-range").textContent.trim();
        const localizacao = item
          .querySelectorAll(".experience-item__meta-item")[1]
          .textContent.trim();
        const descricao = item
          .querySelector(".show-more-less-text__text--less")
          .textContent.trim();

        experiencesArray.push({
          empresa,
          duracao,
          localizacao,
          descricao,
        });
      });

      return experiencesArray;
    });

    // Retornando a resposta como JSON
    res.json({ title, sobre, funcao, localizacao, experiencias });
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
