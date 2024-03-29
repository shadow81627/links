import { Dataset, CheerioCrawler, log, LogLevel, Configuration } from "crawlee";
import metascraper from "metascraper";
import metascraperAuthor from "metascraper-author";
import metascraperDate from "metascraper-date";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogoFavicon from "metascraper-logo-favicon";
import metascraperLogo from "metascraper-logo";
import metascraperClearbit from "metascraper-clearbit";
import metascraperPublisher from "metascraper-publisher";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";

export default defineEventHandler(async () => {
  // Crawlers come with various utilities, e.g. for logging.
  // Here we use debug level of logging to improve the debugging experience.
  // This functionality is optional!
  // log.setLevel(LogLevel.DEBUG);

  const scraper = await metascraper([
    metascraperAuthor(),
    metascraperDate(),
    metascraperDescription(),
    metascraperImage(),
    metascraperLogoFavicon({
      // Pass options directly
      pickFn: async (sizes, { pickBiggerSize, gotOpts }) => {
        const preferred = sizes.find((item) => item.rel?.includes("svg"));
        return preferred ?? (await pickBiggerSize(sizes, { gotOpts }));
      },
    }),
    metascraperLogo(),
    metascraperClearbit(),
    metascraperPublisher(),
    metascraperTitle(),
    metascraperUrl(),
  ]);

  const results = [];

  // Create an instance of the CheerioCrawler class - a crawler
  // that automatically loads the URLs and parses their HTML using the cheerio library.
  const crawler = new CheerioCrawler(
    {
      // The crawler downloads and processes the web pages in parallel, with a concurrency
      // automatically managed based on the available system memory and CPU (see AutoscaledPool class).
      // Here we define some hard limits for the concurrency.
      minConcurrency: 10,
      maxConcurrency: 50,

      // On error, retry each page at most once.
      maxRequestRetries: 1,

      // Increase the timeout for processing of each page.
      requestHandlerTimeoutSecs: 30,

      // Limit to 10 requests per one crawl
      maxRequestsPerCrawl: 10,

      // This function will be called for each URL to crawl.
      // It accepts a single parameter, which is an object with options as:
      // https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlerOptions#requestHandler
      // We use for demonstration only 2 of them:
      // - request: an instance of the Request class with information such as the URL that is being crawled and HTTP method
      // - $: the cheerio object containing parsed HTML
      async requestHandler({ request, $, body }) {
        // log.debug(`Processing ${request.url}...`);

        const metadata = await scraper({ url: request.url, html: body });

        // Store the results to the dataset. In local configuration,
        // the data will be stored as JSON files in ./storage/datasets/default
        // await Dataset.pushData({
        //   url: request.url,
        //   heading: $("h1").first().text(),
        //   ...metadata,
        // });
        results.push({
          url: request.url,
          heading: $("h1").first().text(),
          ...metadata,
        });
      },

      // This function is called if the page processing failed more than maxRequestRetries + 1 times.
      failedRequestHandler({ request }) {
        // log.debug(`Request ${request.url} failed twice.`);
      },
    },
    new Configuration({
      persistStorage: false,
    }),
  );

  // Run the crawler and wait for it to finish.
  await crawler.run([
    "https://crawlee.dev",
    "https://apify.com",
    "https://cheerio.js.org/",
    "https://metascraper.js.org/",
    "https://brightdata.com/",
  ]);

  // log.debug("Crawler finished.");

  // Sharp loader
  const getSharp = async () => {
    return (await import("sharp").then(
      (r) => r.default || r,
    )) as typeof import("sharp");
  };

  const sharp = await getSharp();

  function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  type RGBToHexOptions = { r: number; g: number; b: number };
  function rgbToHex({ r, g, b }: RGBToHexOptions) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // const values = await crawler.getData();
  const data = await Promise.all(
    results.map(async (item) => {
      const image = item.image
        ? await $fetch(item.image, {
            method: "GET",
            responseType: "arrayBuffer",
          })
        : null;
      const { dominant } = image ? await sharp(image).stats() : {};
      const color = rgbToHex(dominant);
      return { attributes: { color, ...item } };
    }),
  );

  return {
    data,
  };
});
