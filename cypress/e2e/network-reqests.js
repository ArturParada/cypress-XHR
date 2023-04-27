/// <reference types ="cypress" />


describe('Nrtwor Requests', () => {
    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests")
    })
    it('Get request', () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*"
        },
            {
                body: {
                    "postId": 1,
                    "id": 1,
                    "name": "testName",
                    "email": "test@gmail.com",
                    "body": "test message"
                }

            }
        ).as("getComment")
        cy.get(".network-btn").click()
        cy.wait('@getComment').its("response.statusCode").should("eq", 200)
    });
    it('Post request', () => {
        cy.intercept("POST", "**/comments").as("postComment")
        cy.get(".btn-success").click()
        cy.wait('@postComment').should(({ request, response }) => {
            console.log(request);
            expect(request.body).to.include("email")
            console.log(response);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()")

            expect(request.headers).to.have.property("content-type")
            expect(request.headers).to.have.property("origin", "https://example.cypress.io")
        })
    });
    it('Put request', () => {
        cy.intercept({
            method: "PUT",
            url: "**/comments/*"
        },
            {
                statusCode: 404,
                body: { error: "test error" },
                delay: 500
            }).as("putComment")
        cy.get(".network-put").click()
        cy.wait('@putComment')
        cy.get('.network-put-comment').should("contain", "test")

    });
});