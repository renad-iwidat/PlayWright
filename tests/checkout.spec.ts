import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
    let page;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);

        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        await page.waitForTimeout(3000);

        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('Complete checkout process successfully', async () => {
        await productsPage.addItemToCart('sauce-labs-backpack');
        await page.waitForTimeout(2000);

        await productsPage.openCart();
        await page.waitForTimeout(2000);

        await cartPage.clickCheckout();
        await page.waitForTimeout(3000);

        await checkoutPage.fillInformation('Renad', 'Iwidat', '05997');
        await page.waitForTimeout(3000);

        await checkoutPage.finish();
        await page.waitForTimeout(3000);

        const successMessage = page.locator('.complete-header');
        await expect(successMessage).toHaveText('Thank you for your order!');
        await page.waitForTimeout(3000);
    });
});
