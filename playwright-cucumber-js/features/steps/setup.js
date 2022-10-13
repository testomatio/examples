const { Before, After, Status} = require("@cucumber/cucumber");
const { chromium } = require('playwright')
require('dotenv').config()

Before(async (scenario) => {
  global.testomatioArtifacts = [];

  // Create page and browser globals to be used in the scenarios
  global.browser = await chromium.launch();

  const context = await global.browser.newContext();

  global.page = await context.newPage();
})

After(async (scenario) => {
  if (scenario.result.status === Status.FAILED) {
    const fileName = `${scenario.title}-failed.png`
    await global.page.screenshot({ path: fileName });
    await global.testomatioArtifacts.push(fileName);
  }

  await global.browser.close()
})
