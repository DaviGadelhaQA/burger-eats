describe("Home Page", () => {
    it("The app should be online", () => {
        cy.visit('/');
        cy.get('h1').should('have.text','Seja um parceiro entregador pela Buger Eats');
    });
});