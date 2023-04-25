/// <reference types ="cypress" />


describe('Nrtwor Requests', () => {
    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests")
    })
    it('Get request', () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*",
        }).as("getComment")
        cy.get(".network-btn").click()
        cy.wait('@getComment').its("response.statusCode").should("eq", 200)
    });
});