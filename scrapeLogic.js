const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    // headless: false,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/in/joao-pedro-eb/");

    await page.waitForTimeout(5000);

    const screenshot = await page.screenshot({ path: 'screenshot.png' });

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    let sobre;
    let funcao;
    let localizacao;
    let experiencias;

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