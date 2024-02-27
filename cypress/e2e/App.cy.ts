describe("App.vue", () => {
  beforeEach(() => {
    // Mock the API response
    // so we can test the UI without relying on the real API
    cy.intercept("GET", `${Cypress.env("api_url")}/posts`, {
      statusCode: 200,
      body: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    });

    cy.visit(Cypress.env("app_url"));
  });

  it("should move items by clicking on the move buttons", () => {
    cy.contains("div", "Post 1")
      .find("button[data-testid='move-down-button']")
      .click();

    cy.get("div[data-testid='list-container'] > div")
      .eq(1)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Post 1");
      });
  });

  it("should add item to history after move", () => {
    cy.contains("div[data-testid='list-item']", "Post 1")
      .find("button[data-testid='move-down-button']")
      .click();

    cy.get("div[data-testid='time-travel-list'] > div")
      .eq(0)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Moved Post 1 from index 0 to index 1");
      });
  });

  it("should travel through time", () => {
    cy.contains("div", "Post 2")
      .find("button[data-testid='move-down-button']")
      .click();

    cy.contains("div", "Post 4")
      .find("button[data-testid='move-down-button']")
      .click();

    cy.contains("div", "Post 3")
      .find("button[data-testid='move-up-button']")
      .click();

    // click on the second action in the time travel list
    cy.get("div[data-testid='time-travel-list'] > div")
      .eq(1)
      .find("button")
      .click();

    // check list of actions contains one element
    cy.get("div[data-testid='time-travel-list'] > div").should(
      "have.length",
      1
    );

    cy.get("div[data-testid='time-travel-list'] > div")
      .eq(0)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Moved Post 2 from index 1 to index 2");
      });

    // check list of posts contains elements with the order of 1, 3, 2, 4, 5
    const expectedTexts = ["Post 1", "Post 3", "Post 2", "Post 4", "Post 5"];
    expectedTexts.forEach((expectedText, index) => {
      cy.get("div[data-testid='list-container'] > div")
        .eq(index)
        .invoke("text")
        .then((text) => {
          expect(text).to.include(expectedText);
        });
    });
  });
});
