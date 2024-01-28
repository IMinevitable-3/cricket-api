import { MenRank } from "./pages/rankings/batsmen.js";
import { WomenRank } from "./pages/rankings/batswomen.js";
import { TeamRank } from "./pages/rankings/teams.js";
import { News } from "./pages/news.js";
(async () => {
  // const scraper = new MenRank();
  // await scraper.initialize("all-rounder"); // batting , bowling , all-rounder
  // await scraper.scrape();
  // const scraper = new WomenRank();
  // await scraper.initialize("all-rounder");
  // await scraper.scrape();
  // const scraper = new TeamRank();
  // await scraper.initialize("men");
  // await scraper.scrape();

  const scraper = new News();
  await scraper.initialize();
  await scraper.scrape();
})();
