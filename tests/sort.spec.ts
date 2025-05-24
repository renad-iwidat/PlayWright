import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sort Feature', () => {
    let page;
    let productsPage: ProductsPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

        // Wait for inventory page to load fully
        await page.waitForURL('**/inventory.html', { timeout: 10000 });
        await page.waitForSelector('[data-test="product-sort-container"]', { timeout: 10000 });

        productsPage = new ProductsPage(page);
    });

    test.beforeEach(async () => {
        // Reload inventory page before each test to reset state
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.waitForSelector('[data-test="product-sort-container"]', { timeout: 10000 });
    });

    test('should sort products A to Z', async () => {
        await productsPage.sortBy('az');
        const names = await productsPage.getProductNames();
        const expected = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(expected);
    });

    test('should sort products Z to A', async () => {
        await productsPage.sortBy('za');
        const names = await productsPage.getProductNames();
        const expected = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(expected);
    });

    test('should sort products from Low to High price', async () => {
        await productsPage.sortBy('lohi');
        const prices = await productsPage.getProductPrices();
        const expected = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(expected);
    });

    test('should sort products from High to Low price', async () => {
        await productsPage.sortBy('hilo');
        const prices = await productsPage.getProductPrices();
        const expected = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(expected);
    });
});
