const {When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

When("Open Test At Scale page", async function() {
  await page.hover("text=Platform");
  await page.click("h3:has-text(\"Test At Scale\")");
});

Then("Open Test At Scale documentation", async function() {
  await page.click("a.leading-none:nth-child(1)");
  let title = await page.title();

    assert.equal(title, "Test At Scale | LambdaTest",
        "Page title does not match");

});
