import { BaseScraper } from "../pupeeter_config.js";
import { TEAM_URL } from "./base.js";
export class TeamRank extends BaseScraper {
  constructor() {
    super();
    this.gender = null;
  }
  async initialize(gender) {
    await super.initialize();
    this.gender = gender;
  }

  async scrape() {
    try {
      await this.page.goto(TEAM_URL + `${this.gender}/teams`);

      const teamInfoList = await this.page.evaluate(() => {
        const teams = [];
        const hotspots = [
          ...document.querySelectorAll(".cb-col.cb-col-100.cb-padding-left0"),
          ...document.querySelectorAll(
            ".cb-col.cb-col-100.cb-padding-left0.ng-hide"
          ),
        ];
        let tmp = -1;
        hotspots.forEach((element) => {
          const teamElements = element.querySelectorAll(
            ".cb-col.cb-col-100.cb-font-14.cb-brdr-thin-btm"
          );
          tmp++;
          let ft = ["test", "odi", "t20"];
          teamElements.forEach((teamElement, index) => {
            const format = ft[tmp];

            const position = teamElement
              .querySelector(".cb-col.cb-col-20.cb-lst-itm-sm")
              .innerText.trim();
            const teamName = teamElement
              .querySelector(".cb-col.cb-col-50.cb-lst-itm-sm.text-left")
              .innerText.trim();
            const rating = teamElement
              .querySelector(".cb-col.cb-col-14.cb-lst-itm-sm")
              .innerText.trim();
            const points = teamElement
              .querySelector(".cb-col.cb-col-14.cb-lst-itm-sm")
              .innerText.trim();

            teams.push({
              format,
              position,
              teamName,
              rating,
              points,
            });
          });
        });

        return teams;
      });

      const groupedTeams = teamInfoList.reduce((result, team) => {
        result[team.format] = result[team.format] || [];
        result[team.format].push({
          position: team.position,
          teamName: team.teamName,
          rating: team.rating,
          points: team.points,
        });
        return result;
      }, {});
      return groupedTeams;
      console.log("Grouped Team Information:", groupedTeams);
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      await this.close();
    }
  }
}
`
Test: [
    { position: '1', teamName: 'INDIA', rating: '121', points: '121' },
    {
      position: '2',
      teamName: 'AUSTRALIA',
      rating: '117',
      points: '117'
    },
    {
      position: '3',
      teamName: 'SOUTH AFRICA',
      rating: '110',
      points: '110'
    },
    {
      position: '4',
      teamName: 'PAKISTAN',
      rating: '109',
      points: '109'
    },
    {
      position: '5',
      teamName: 'NEW ZEALAND',
      rating: '102',
      points: '102'
    },
    { position: '1', teamName: 'INDIA', rating: '265', points: '265' },
    {
      position: '2',
      teamName: 'ENGLAND',
      rating: '256',
      points: '256'
    },
    {
      position: '3',
      teamName: 'NEW ZEALAND',
      rating: '254',
      points: '254'
    },
    {
      position: '4',
      teamName: 'PAKISTAN',
      rating: '251',
      points: '251'
    },
    {
      position: '5',
      teamName: 'AUSTRALIA',
      rating: '250',
      points: '250'
    },
    {
      position: '1',
      teamName: 'AUSTRALIA',
      rating: '121',
      points: '121'
    },
    { position: '2', teamName: 'INDIA', rating: '117', points: '117' },
    {
      position: '3',
      teamName: 'ENGLAND',
      rating: '115',
      points: '115'
    },
    {
      position: '4',
      teamName: 'SOUTH AFRICA',
      rating: '106',
      points: '106'
    },
    {
      position: '5',
      teamName: 'NEW ZEALAND',
      rating: '95',
      points: '95'
    },
    { position: '1', teamName: 'INDIA', rating: '121', points: '121' },
    {
      position: '2',
      teamName: 'AUSTRALIA',
      rating: '117',
      points: '117'
    },
    {
      position: '3',
      teamName: 'SOUTH AFRICA',
      rating: '110',
      points: '110'
    },
    {
      position: '4',
      teamName: 'PAKISTAN',
      rating: '109',
      points: '109'
    },
    {
      position: '5',
      teamName: 'NEW ZEALAND',
      rating: '102',
      points: '102'
    },
    { position: '1', teamName: 'INDIA', rating: '265', points: '265' },
    {
      position: '2',
      teamName: 'ENGLAND',
      rating: '256',
      points: '256'
    },
    {
      position: '3',
      teamName: 'NEW ZEALAND',
      rating: '254',
      points: '254'
    },
    {
      position: '4',
      teamName: 'PAKISTAN',
      rating: '251',
      points: '251'
    },
    {
      position: '5',
      teamName: 'AUSTRALIA',
      rating: '250',
      points: '250'
    }
  ],

`;
