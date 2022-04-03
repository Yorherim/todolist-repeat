describe("Task", () => {
    it("task is not done, visually looks correct", async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto(
            "http://localhost:9009/iframe.html?id=project-task--is-done&viewMode=story"
        );

        // eslint-disable-next-line no-undef
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
    it("task is done, visually looks correct", async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto(
            "http://localhost:9009/iframe.html?id=project-task--is-not-done&viewMode=story"
        );

        // eslint-disable-next-line no-undef
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
