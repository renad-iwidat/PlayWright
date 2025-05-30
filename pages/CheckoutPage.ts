import { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) { }

    async fillInformation(firstName: string, lastName: string, zip: string) {
        await this.page.fill('[data-test="firstName"]', firstName);
        await this.page.fill('[data-test="lastName"]', lastName);
        await this.page.fill('[data-test="postalCode"]', zip);
        await this.page.click('[data-test="continue"]');
    }

    async finish() {
        await this.page.click('[data-test="finish"]');
    }
}
