import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Remove from Cart Feature', () => {
    let productsPage: ProductsPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);

        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        await page.waitForTimeout(3000);

        productsPage = new ProductsPage(page);
    });

    test('Add and remove an item from the cart', async () => {
        // Add item
        await productsPage.addItemToCart('sauce-labs-fleece-jacket');
        await page.waitForTimeout(2000);

        // Open cart
        await productsPage.openCart();
        await page.waitForTimeout(2000);

        // Remove item
        await productsPage.removeItemFromCart('sauce-labs-fleece-jacket');
        await page.waitForTimeout(2000);

        // Expect cart to be empty
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
        await page.waitForTimeout(3000);
    });
});
