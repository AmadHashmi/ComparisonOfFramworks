const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page containing the "Create Note" button
  await page.goto("http://localhost:4200");

  // Wait for the "New Note" button to be present
  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 10; i++) {
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
    // await page.screenshot({ path: `screenshot_${i + 1}.png` });
    // Click the submit button
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

  // Navigate to the page containing the "Create Note" button
  await page.goto("http://localhost:4200");

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

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 50 notes: ${elapsedTime} ms`);

  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page containing the "Create Note" button
  await page.goto("http://localhost:4200");

  // Wait for the "New Note" button to be present
  await page.waitForSelector("#new-note");

  const startTime = Date.now();

  for (let i = 0; i < 100; i++) {
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

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`Time taken to create 100 notes: ${elapsedTime} ms`);

  await browser.close();
})();
