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
          return playerId;
          await this.scrapeProfile(playerId);
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
    `returns stats of player based on ID extracted by above function (batting , bowling and recent matches)`;
    const profileUrl = PROFILE_URL + `${this.name}-${playerId}`;
    // const profileUrl = PROFILE_URL; // testing URL

    const browser = await puppeteer.launch({ headless: "new" });
    try {
      const page = await browser.newPage();
      await page.goto(profileUrl);

      console.log(`Current URL: ${page.url()}`);
      const playerInfo = await page.evaluate(() => {
        const grid = document.querySelector(
          ".ds-grid.lg\\:ds-grid-cols-3.ds-grid-cols-2.ds-gap-4.ds-mb-8"
        );

        if (!grid) {
          console.error("Grid element not found");
          return null;
        }

        const items = Array.from(grid.children);
        const data = {};

        items.forEach((item) => {
          const labelElement = item.querySelector(
            "p.ds-text-tight-s.ds-font-regular.ds-uppercase.ds-text-typo-mid3"
          );
          const valueElement = item.querySelector(
            "span.ds-text-title-xs.ds-font-bold.ds-text-typo p"
          );

          if (labelElement && valueElement) {
            const label = labelElement.innerText.trim();
            const value = valueElement.innerText.trim();
            data[label] = value;
          }
        });

        return data;
      });

      const data = await page.evaluate(() => {
        const tables = Array.from(document.querySelectorAll("table"));

        console.log(`Number of tables: ${tables.length}`);

        const allData = [];

        tables.forEach((table) => {
          const headerColumns = Array.from(
            table.querySelectorAll("thead tr th")
          );
          const rows = Array.from(table.querySelectorAll("tbody tr"));

          console.log(`Number of rows in the current table: ${rows.length}`);

          const tableData = rows.map((row) => {
            const columns = Array.from(row.querySelectorAll("td"));

            const rowData = {};
            columns.forEach((column, index) => {
              const headerText = headerColumns[index].innerText.trim();
              const columnText = column.innerText.trim();
              rowData[headerText] = columnText;
            });

            return rowData;
          });

          allData.push(tableData);
        });

        return allData;
      });
      data.push({ playerInfo: playerInfo });
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      await browser.close();
    }
  }
}
