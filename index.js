import { MenRank } from "./pages/rankings/batting.js";

(async () => {
  const scraper = new MenRank();
  await scraper.initialize("bowling"); // batting , bowling , all-rounder
  await scraper.scrape();
})();
