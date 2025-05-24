import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) { }

    async addItemToCart(itemName: string) {
        await this.page.click(`button[data-test="add-to-cart-${itemName}"]`);
    }

    async removeItemFromCart(itemName: string) {
        await this.page.click(`button[data-test="remove-${itemName}"]`);
    }

    async openCart() {
        await this.page.click('.shopping_cart_link');
    }

    async sortBy(value: string) {
        // NOTE: Confirm selector matches your app's DOM (using hyphen, not underscore)
        const dropdown = this.page.locator('[data-test="product-sort-container"]');
        await dropdown.waitFor({ state: 'visible', timeout: 10000 }); // Wait max 10s for dropdown
        await dropdown.selectOption(value);
        await this.page.waitForTimeout(1000); // small wait to allow sorting effect
    }

    async getProductNames(): Promise<string[]> {
        return this.page.locator('.inventory_item_name').allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.page.$$eval('.inventory_item_price', elements =>
            elements.map(el => parseFloat(el.textContent!.replace('$', '')))
        );
        return prices;
    }
}
