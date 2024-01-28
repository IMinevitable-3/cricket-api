import puppeteer from "puppeteer";

export class BaseScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.role = null;
  }

  async initialize(role) {
    this.browser = await puppeteer.launch({ headless: "new" });
    this.page = await this.browser.newPage();
    this.role = role;
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
