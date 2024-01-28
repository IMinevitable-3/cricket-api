import { URL } from "./base.js";
import { BaseScraper } from "../pupeeter_config.js";

export class MenRank extends BaseScraper {
  async scrape() {
    try {
      await this.page.goto(URL + this.role);

      const playerInfoList = await this.page.evaluate(() => {
        const players = [];
        const playerElements = document.querySelectorAll(
          ".cb-col.cb-col-100.cb-font-14.cb-lst-itm.text-center"
        );

        playerElements.forEach((playerElement, index) => {
          const format = index < 99 ? "Test" : index < 198 ? "ODI" : "T20";

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

      console.log("Grouped Player Information:", groupedPlayers);
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      await this.close();
    }
  }
}

`
{
  "test":[
    {
      rank: '40',
      name: 'Liam Livingstone',
      country: 'ENGLAND',
      imageUrl: 'https://static.cricbuzz.com/a/img/v1/50x50/i1/c351856/liam-livingstone.jpg',
      rating: {}
    ,{}
  ], 
  "odi":[
    {},
  ],
  "t20":[
    {

    }
  ]
}


`;
