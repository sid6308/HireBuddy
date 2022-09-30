describe("Logging In", () => {
  const email = "pragati.varshney@publicissapient.com";
  const password = "Prag@123";

  context("Unauthorized", () => {
    it("is redirected on /login if not authorised", () => {
      cy.visit("/");

      cy.url().should("include", "login");
    });
  });

  context("Login form submission", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("displays errors on login", () => {
      cy.get("input[name=email]").type("pragati.varshney@sapient.com");
      cy.get("input[name=password]").type("Prag@123{enter}");

      cy.get("span")
        .should("be.visible")
        .and("contain", "Please enter valid email");

      cy.url().should("include", "/login");
    });

    it("redirects to / on success", () => {
      cy.get("input[name=email]").type(email);
      cy.get("input[name=password]").type(password);
      cy.get("form").submit();

      cy.url().should("include", "/", () => {
        expect(localStorage.getItem("user")).to.exist();
      });

      cy.get("p").should("contain", "Welcome Pragati");
    });
  });
});
