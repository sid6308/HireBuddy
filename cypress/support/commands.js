import "cypress-localstorage-commands";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/login",
    body: {
      email: "arshath.sajjath@publicissapient.com",
      password: "Arsh@123",
    },
  }).then((res) => {
    cy.setLocalStorage("user", JSON.stringify(res.body));
  });
});
