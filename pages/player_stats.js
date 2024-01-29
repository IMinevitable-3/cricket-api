import { PLAYER_URL } from "./rankings/base.js";
import { PROFILE_URL } from "./rankings/base.js";
import puppeteer from "puppeteer";

export class Player {
  constructor(name) {
    this.name = name.split(" ").join("+");
  }

  async scrape() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    try {
      const playerUrl = PLAYER_URL + `${this.name};template=analysis`;
      await page.goto(playerUrl);

      const noMatchingPlayers = await page.$eval(
        'td[colspan="3"] > b',
        (element) => element.innerText
      );

      if (noMatchingPlayers === "No matching players found") {
        console.log("No matching players found");
        return;
      }

      const playerInfoList = await page.evaluate(() => {
        const rows = [document.querySelectorAll("table tbody tr")[0]];

        const playerInfoArray = [];

        rows.forEach((row) => {
          const nameElement = row.querySelector(
            'td > span[style="white-space: nowrap"]'
          );
          const name = nameElement ? nameElement.innerText.trim() : null;

          const countryElement = row.querySelector("td:nth-child(2)");
          const country = countryElement
            ? countryElement.innerText.trim()
            : null;

          const linkElement = row.querySelector("td > a.statsLinks");
          const link = linkElement ? linkElement.getAttribute("href") : null;

          playerInfoArray.push({ name, country, link });
        });

        return playerInfoArray;
      });

      console.log(playerInfoList);
      if (playerInfoList.length > 0 && playerInfoList[0].link) {
        this.name = playerInfoList[0].name.split(" ").join("-");
        const playerLink = playerInfoList[0].link;
        const playerIdMatch = playerLink.match(/\/player\/(\d+)\.html/);

        if (playerIdMatch) {
          const playerId = playerIdMatch[1];
          //   await this.scrapeProfile(playerId);
        } else {
          console.error("Unable to extract player ID from the link");
        }
      }
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      await browser.close();
    }
  }

  async scrapeProfile(playerId) {
    const profileUrl = `https://www.espncricinfo.com/cricketers/${this.name}-${playerId}`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const stats = await page.evaluate(() => {
      const Tables = document.querySelectorAll(
        ".ds-w-full.ds-table.ds-table-md.ds-table-bordered.ds-border-collapse.ds-border.ds-border-line.ds-table-auto.ds-overflow-scroll"
      );

      Tables.forEach((table) => {
        const theadElement = table.querySelector(
          ".ds-bg-fill-content-alternate.ds-text-left.ds-text-right"
        );
        const thElements = theadElement.querySelectorAll("th");

        const thContentArray = Array.from(thElements).map((thElement) =>
          thElement.textContent.trim()
        );

        console.log(thContentArray);
      });
    });

    try {
      await page.goto(profileUrl);
    } catch (e) {
      console.log(e);
    }
    console.log(profileUrl);
  }
}
