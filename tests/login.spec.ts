import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        await expect(page).toHaveURL(/inventory\.html/);
        await page.waitForTimeout(3000);
    });

    test('Login fails with invalid credentials', async ({ page }) => {
        await loginPage.login('invalid_user', 'wrong_pass');
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await page.waitForTimeout(3000);
    });
});
