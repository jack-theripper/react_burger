
// + перетаскивание ингредиента в конструктор,
// + открытие модального окна с описанием ингредиента,
// + отображение в модальном окне данных ингредиента,
// + открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»,
// + закрытие модальных окон при клике на кнопку закрытия

describe('Написаны Cypress-тесты для страницы «Конструктор»', () => {

    it('открытие сайта', () => {
        cy.visit('http://localhost:3000')
    });

    it('открытие модального окна с описанием ингредиента', () => {
        cy.contains('Краторная булка N-200i').click();
        cy.get('#modals').contains('Детали ингредиента').should('be.visible');
        cy.get('#modals *[class^="modal_close"]').click();
    });

    it('отображение в модальном окне данных ингредиента', () => {
        cy.contains('Флюоресцентная булка R2-D3').click();
        cy.get('#modals').contains('Детали ингредиента').should('be.visible');
        cy.get('#modals').contains('Флюоресцентная булка R2-D3').should('be.visible');
        cy.get('#modals').get('img');
        cy.get('#modals ul > li').should('have.length', 4);
        cy.get('#modals *[class^="modal_close"]').click();
    });

    it('перетаскивание ингредиента в конструктор', () => {
        cy.get('[class^="burger-ingredients_scroll"]').first().as('ingredients');
        cy.get('[class^="burger-constructor_list"]').first().as('order_ingredients');
        cy.contains('Оформить заказ').as('order_button');

        cy.get('@ingredients').contains('Краторная булка N-200i').trigger('dragstart');
        cy.get('@order_ingredients').trigger('drop');
        cy.get('@ingredients').contains('Мясо бессмертных моллюсков Protostomia').trigger('dragstart');
        cy.get('@order_ingredients').trigger('drop');
        cy.get('@ingredients').contains('Соус традиционный галактический').trigger('dragstart');
        cy.get('@order_ingredients').trigger('drop');

        cy.get('@order_button').should('be.enabled').click();

        cy.location('pathname').should('eq', '/login');
        cy.get('input[type="email"]').type('dmitry.arhitector@yandex.ru');
        cy.get('input[type="password"]').type('123456');
        cy.contains('Войти').click();

        cy.wait(1000);
        cy.get('@order_button').should('be.enabled').click();
        cy.get('#modals').contains('идентификатор заказа', {timeout: 30000}).prev('p').should("exist");

        cy.get('#modals *[class^="modal_overlay"]').click(-10,-10, {force: true})
    });

})