const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 10; i++) {
    await page.click("#new-note");

    await page.waitForSelector('input[name="title"]');
    await page.waitForSelector('textarea[name="description"]');

    await page.type('input[name="title"]', `Note ${i + 1}`);
    await page.type(
      'textarea[name="description"]',
      `Description for Note ${i + 1}`
    );
    // await page.screenshot({ path: `screenshot_${i + 1}.png` });
    await page.click("#submit");
  }

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 10 notes: ${elapsedTime} ms`);

  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 50; i++) {
    await page.click("#new-note");

    await page.waitForSelector('input[name="title"]');
    await page.waitForSelector('textarea[name="description"]');

    await page.type('input[name="title"]', `Note ${i + 1}`);
    await page.type(
      'textarea[name="description"]',
      `Description for Note ${i + 1}`
    );

    await page.click("#submit");
  }

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 50 notes: ${elapsedTime} ms`);

  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 100; i++) {
    await page.click("#new-note");

    await page.waitForSelector('input[name="title"]');
    await page.waitForSelector('textarea[name="description"]');

    await page.type('input[name="title"]', `Note ${i + 1}`);
    await page.type(
      'textarea[name="description"]',
      `Description for Note ${i + 1}`
    );

    await page.click("#submit");
  }

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 100 notes: ${elapsedTime} ms`);

  await browser.close();
})();
