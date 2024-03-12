const puppeteer = require("puppeteer");
require("dotenv").config();
const path = require("path");

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    // headless: 'new',
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      // '--incognito',
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

    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/in/joao-pedro-eb/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // const screenshot = await page.screenshot({ path: path.resolve(__dirname, 'screenshot.png') });

    // Encontre o link pelo texto âncora
    const signInLink = await page.$x(
      "//p[contains(@class, 'main__sign-in-container')]//a[contains(text(), 'Sign in')]"
    );

    // Clique no link se ele existir
    if (signInLink.length > 0) {
      await signInLink[0].click();
      console.log('Clicou no link "Sign in"');
    } else {
      console.log('Link "Sign in" não encontrado.');
    }

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
    // res.json({ title, sobre, funcao, localizacao, experiencias });
    res.send(screenshot);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
