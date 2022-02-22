const { Builder, Capabilities, By } = require("selenium-webdriver");

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5501/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

describe("add movie to list and delete", async () => {
  const movie = "Spider-man";
  test("add movie", async () => {
    const inputField = await driver.findElement(By.xpath("//input"));
    await inputField.sendKeys(`${movie}`);
    await driver.sleep(2000);
    const submitButton = await driver.findElement(By.css("button"));
    await submitButton.click();
    await driver.sleep(2000);
  });
  test("cross out movie", async () => {
    const movieTitle = await driver.findElement(By.xpath("//li/span"));
    await movieTitle.click();

  });

  test("message about crossed out movie", async () => {
    const verifiedMessage = `${movie} watched!`;
    const checkedMessage = await driver.findElement(By.css("#message")).getText();
    expect(checkedMessage.toLowerCase()).toBe(verifiedMessage.toLowerCase());
    await driver.sleep(2000);
  });

  test("delete movie", async () => {
    const deleteButton = await driver.findElement(By.css(`#${movie}`));
    await deleteButton.click();
    await driver.sleep(2000);
  });
});
