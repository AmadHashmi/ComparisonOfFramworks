const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:5173");

  await page.waitForSelector("#new-note");
  await page.setViewport({
    width: 1200,
    height: 900,
  });
  const startTime = Date.now();

  for (let i = 0; i < 10; i++) {
    await page.click("#new-note");

    await page.waitForSelector('input[id="title"]');
    await page.waitForSelector('textarea[id="description"]');

    await page.type('input[id="title"]', `Note ${i + 1}`);
    await page.type(
      'textarea[id="description"]',
      `Description for Note ${i + 1}`
    );
    await page.click("#submit");
  }
  await page.screenshot({ path: "created10.png" });
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;
  console.log(`Time taken to create 10 notes: ${elapsedTime} ms`);
  // update notes:

  const updateStartTime = Date.now();

  for (let i = 0; i < 10; i++) {
    await page.waitForSelector(`#update-note${i + 1}`);
    await page.click(`#update-note${i + 1}`);

    await page.waitForSelector('input[id="title"]');
    await page.waitForSelector('textarea[id="description"]');
    await page.type('input[id="title"]', ` updated`);
    await page.type('textarea[id="description"]', ` updated`);

    await page.click("#submit");

    // await page.screenshot({ path: `update-note${i + 1}.png` });
  }

  await page.screenshot({ path: "updated10.png" });
  const updateEndTime = Date.now();
  const updateElapsedTime = updateEndTime - updateStartTime;
  console.log(`Time taken to update 10 notes: ${updateElapsedTime} ms`);

  // deleting 10 notes:
  const deleteStartTime = Date.now();
  for (let i = 9; i >= 0; i--) {
    await page.click(`#delete-note${i + 1}`);
  }
  await page.screenshot({ path: "delete10.png" });
  const deleteEndTime = Date.now();
  const deleteElapsedTime = deleteEndTime - deleteStartTime;
  console.log(`Time taken to delete 10 notes: ${deleteElapsedTime} ms`);

  await browser.close();
})();
