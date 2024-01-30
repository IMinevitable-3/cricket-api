import { WOMEN_URL } from "./base.js";
import { BaseScraper } from "../pupeeter_config.js";

export class WomenRank extends BaseScraper {
  constructor() {
    super();
    this.role = null;
  }
  async initialize(role) {
    await super.initialize();
    this.role = role;
  }
  async scrape() {
    try {
      await this.page.goto(WOMEN_URL + this.role);

      const playerInfoList = await this.page.evaluate(() => {
        const players = [];

        const hotspots = [
          ...document.querySelectorAll(".cb-col.cb-col-100.cb-padding-left0"),
          ...document.querySelectorAll(
            ".cb-col.cb-col-100.cb-padding-left0.ng-hide"
          ),
        ];

        let tmp = -1;
        hotspots.forEach((element) => {
          const playerElements = element.querySelectorAll(
            ".cb-col.cb-col-100.cb-font-14.cb-lst-itm.text-center"
          );
          let fmt = ["odi", "t20"];
          let Format = fmt[++tmp];

          playerElements.forEach((playerElement) => {
            const format = Format;

            const rank = playerElement
              .querySelector(".cb-col.cb-col-16.cb-rank-tbl.cb-font-16")
              .innerText.trim();
            const nameElement = playerElement.querySelector(
              ".cb-col.cb-col-67.cb-rank-plyr a"
            );
            const name = nameElement ? nameElement.innerText.trim() : "";
            const country = playerElement
              .querySelector(
                ".cb-col.cb-col-67.cb-rank-plyr .cb-font-12.text-gray"
              )
              .innerText.trim();
            const imageUrl = playerElement.querySelector(
              ".cb-col.cb-col-50.cb-lst-itm-sm.text-left img"
            ).src;
            const rating = playerElement.querySelector(
              ".cb-col.cb-col-17.cb-rank-tbl.pull-right"
            );
            players.push({
              rank,
              name,
              country,
              imageUrl,
              format,
              rating,
            });
          });
        });
        return players;
      });

      const groupedPlayers = playerInfoList.reduce((result, player) => {
        result[player.format] = result[player.format] || [];
        result[player.format].push({
          rank: player.rank,
          name: player.name,
          country: player.country,
          imageUrl: player.imageUrl,
          rating: player.rating,
        });
        return result;
      }, {});

      return groupedPlayers;
      console.log("Grouped Player Information:", groupedPlayers);
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      await this.close();
    }
  }
}
