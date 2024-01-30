import { BaseScraper } from "./pupeeter_config.js";
import { NEWS_URL } from "./rankings/base.js";

export class News extends BaseScraper {
  constructor() {
    super();
  }
  async initialize() {
    await super.initialize();
  }
  async scrape() {
    try {
      await this.page.goto(NEWS_URL);
      const newsItems = await this.page.evaluate(async () => {
        const items = [];

        const newsElements = document.querySelectorAll(
          ".cb-col-100.cb-lst-itm.cb-pos-rel.cb-lst-itm-lg"
        );
        for (const newsElement of newsElements) {
          const heading = newsElement
            .querySelector(".cb-nws-hdln")
            .innerText.trim();
          const link = newsElement
            .querySelector(".cb-nws-hdln-ancr")
            .getAttribute("href");
          const content = await getContent(link, this.browser);

          items.push({ heading, link, content });
        }
        async function getContent(link) {
          try {
            const response = await fetch(`https://www.cricbuzz.com${link}`);
            const html = await response.text();
            const contentElement = new DOMParser().parseFromString(
              html,
              "text/html"
            );

            const paragraphs = Array.from(
              contentElement.querySelectorAll(".cb-nws-para"),
              (element) => element.innerText.trim()
            );

            return paragraphs.join("\n");
          } catch (error) {
            console.error("Error getting content:", error);
            return "";
          }
        }

        return items;
      });
      return newsItems;
      console.log(newsItems);
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      await this.close();
    }
  }
}
