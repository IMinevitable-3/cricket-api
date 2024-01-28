import puppeteer from "puppeteer";

export class BaseScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({ headless: "new" });
    this.page = await this.browser.newPage();
  }

  async scrape() {
    throw new Error("Scrape method must be implemented in the subclass");
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
