const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page containing the "Create Note" button
  await page.goto("http://localhost:4200");
  await page.setViewport({
    width: 1200,
    height: 4500,
  });
  // Wait for the "New Note" button to be present
  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 50; i++) {
    // Click the "New Note" button
    await page.click("#new-note");

    // Wait for the input fields to be present
    await page.waitForSelector('input[formControlName="title"]');
    await page.waitForSelector('textarea[formControlName="description"]');

    // Type into the title and description input fields
    await page.type('input[formControlName="title"]', `Note ${i + 1}`);
    await page.type(
      'textarea[formControlName="description"]',
      `Description for Note ${i + 1}`
    );

    // Click the submit button
    await page.click("#submit");
  }
  await page.screenshot({ path: "created50.png" });
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 50 notes: ${elapsedTime} ms`);

  // update notes:

  const updateStartTime = Date.now();

  for (let i = 0; i < 50; i++) {
    await page.waitForSelector(`#update-note${i + 1}`);
    await page.click(`#update-note${i + 1}`);

    await page.waitForSelector('input[formControlName="title"]');
    await page.waitForSelector('textarea[formControlName="description"]');
    await page.type('input[formControlName="title"]', ` updated`);
    await page.type('textarea[formControlName="description"]', ` updated`);

    await page.click("#update");

    // await page.screenshot({ path: `update-note${i + 1}.png` });
  }

  await page.screenshot({ path: "updated50.png" });
  const updateEndTime = Date.now();
  const updateElapsedTime = updateEndTime - updateStartTime;
  console.log(`Time taken to update 50 notes: ${updateElapsedTime} ms`);
  await page.setViewport({
    width: 1200,
    height: 900,
  });
  // deleting 10 notes:
  const deleteStartTime = Date.now();
  for (let i = 49; i >= 0; i--) {
    await page.click(`#delete-note${i + 1}`);
  }
  await page.screenshot({ path: "delete50.png" });
  const deleteEndTime = Date.now();
  const deleteElapsedTime = deleteEndTime - deleteStartTime;
  console.log(`Time taken to delete 50 notes: ${deleteElapsedTime} ms`);

  await browser.close();
})();
