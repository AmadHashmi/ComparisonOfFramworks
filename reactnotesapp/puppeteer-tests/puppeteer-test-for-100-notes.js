const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.setViewport({
    width: 1200,
    height: 9000,
  });
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
  await page.screenshot({ path: "created100.png" });
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 100 notes: ${elapsedTime} ms`);

  // update 100 notes:

  const updateStartTime = Date.now();

  for (let i = 0; i < 100; i++) {
    await page.waitForSelector(`#update-note${i + 1}`);
    await page.click(`#update-note${i + 1}`);

    await page.waitForSelector('input[name="title"]');
    await page.waitForSelector('textarea[name="description"]');
    await page.type('input[name="title"]', ` updated`);
    await page.type('textarea[name="description"]', ` updated`);

    await page.click("#submit");

    // await page.screenshot({ path: `update-note50_${i + 1}.png` });
  }

  await page.screenshot({ path: "updated100.png" });
  const updateEndTime = Date.now();
  const updateElapsedTime = updateEndTime - updateStartTime;
  console.log(`Time taken to update 100 notes: ${updateElapsedTime} ms`);

  // deleting 100 notes:
  const deleteStartTime = Date.now();
  await page.setViewport({
    width: 1200,
    height: 900,
  });
  for (let i = 99; i >= 0; i--) {
    await page.click(`#delete-note${i + 1}`);
  }
  await page.screenshot({ path: "delete100.png" });
  const deleteEndTime = Date.now();
  const deleteElapsedTime = deleteEndTime - deleteStartTime;
  console.log(`Time taken to delete 100 notes: ${deleteElapsedTime} ms`);

  await browser.close();
})();
