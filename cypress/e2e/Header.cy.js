describe("Header", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("displays logo and nav links", () => {
    cy.get("h1").should("contain", "HireBuddy");
    cy.get("li").should("contain", "Home");
    cy.get("button").should("contain", "Logout");
  });

  it("redirects to /login after clicking logout", () => {
    cy.contains("Logout").click();
    cy.url().should("include", "/login", () => {
      expect(localStorage.getItem("user")).to.not.exist();
    });
  });
});
