describe("Interview Details", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Check routing to interview detail page", () => {
    cy.visit("/login");
    cy.login();
    cy.visit("/");
    cy.get('[data-cy="action"]').eq(0).click();
    cy.url().should("include", "interviewDetail");
  });

  it("Check all the input fields are read only", () => {
    cy.get('[data-testid="input-field"]').each((element, index) => {
      cy.wrap(element).should("have.attr", "readonly", "readonly");
    });
  });

  it("Check all the mandatory input fields has values", () => {
    const excludeItem = ["trainings", "trainable"];
    cy.get('[data-testid="input-field"]').each((element, index) => {
      const label = element[0].ariaLabel;
      if (!excludeItem.includes(label)) {
        cy.wrap(element).invoke("val").should("not.be.empty");
      }
    });
  });
});
