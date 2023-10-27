import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


    Given("I'm at Google", () => {
        cy.visit('https://www.google.com');
    });

    When("I type search word {string}", (keyword) => {
        cy.get('.gLFyf').type(keyword);
    });

    When("Press 'Search'", () => {
        cy.get('.aajZCb > .lJ9FBc > center > .gNO89b').click()
    });

    Then("I have some results", () => {
        cy.get('#result-stats').should('be.visible')
    });
