describe("Conduct Interview", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Check routing to conduct interview - interview details from homepage", () => {
    cy.visit("/login");
    cy.login();
    cy.visit("/");
    cy.get('[data-testid="conductInterview"]').click();
    cy.url().should("include", "conductInterview/interviewDetails");
  });

  it("checking typed search user", () => {
    cy.get('[aria-label="search"]').type(100);
    cy.get('[data-cy="10091037"]').click();
    cy.get('[aria-label="interviewer_firstname"]')
      .invoke("val")
      .should("not.be.empty");
    cy.get('[aria-label="interviewer_lastname"]')
      .invoke("val")
      .should("not.be.empty");
    cy.get('[aria-label="interviewer_email"]')
      .invoke("val")
      .should("not.be.empty");
    cy.get('[aria-label="interviewer_careerStage"]')
      .invoke("val")
      .should("not.be.empty");
  });

  it("checking interview details form submit and redirect to technical round page", () => {
    cy.get('[aria-label="date"]').type("2022-09-12");
    cy.get('[data-cy="Mode"]').click();
    cy.get('[data-cy="inPerson"]').click();
    cy.get('[data-cy="Type"]').click();
    cy.get('[data-cy="coreXt"]').click();
    cy.get('[aria-label="candidate_firstname"]').type("arul kumar 1");
    cy.get('[aria-label="candidate_lastname"]').type("Sajjath");
    cy.get('[aria-label="phone"]').type("8896548679");
    cy.get('[aria-label="candidate_email"]').type("arshath@gmail.com");
    cy.get('[data-cy="Career Stage"]').click();
    cy.get('[data-cy="associateL1"]').click();
    cy.get("input[type=file]").selectFile("cypress/fixtures/sample.pdf");
    cy.get('[data-testid="btn"]').click();
    cy.url().should("include", "conductInterview/technicalRound");
  });

  it("modifying score and adding feedback then routing to final feedback", () => {
    cy.get('[data-cy="Request lifecycle, DOM and CSSOM"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[aria-label="Request lifecycle, DOM and CSSOM"]').type("good");
    cy.get('[data-testid="btn"]').click();
    cy.url().should("include", "conductInterview/finalFeedback");
  });

  it("updating final feedback and creating interview then routing to homepage", () => {
    cy.get('[aria-label="experience"]').type(2);

    cy.get('[data-cy="Recommended Career Stage"]').click();
    cy.get('[data-cy="juniorAssociate"]').click();
    cy.get('[data-cy="Outcome"]').click();
    cy.get('[data-cy="rejected"]').click();
    cy.get('[aria-label="feedback"]').type(
      "Ut vitae urna consectetur, gravida urna sit amet, dictum tellus. Aliquam et cursus velit. Curabitur eget urna ac mauris vulputate sollicitudin. Quisque suscipit vel ligula eu dignissim. Suspendisse luctus ac odio vel gravida. Suspendisse ipsum nisl, blandit vitae elit et, gravida tristique erat. Donec luctus eu metus eu fringilla. Quisque ac mi maximus, rhoncus est in, commodo sem. Morbi semper fringilla arcu in venenatis. Vestibulum venenatis leo neque, vitae ultricies turpis vulputate eget. Donec blandit gravida ipsum, in dignissim dui tempor vitae. Vestibulum pellentesque metus quis mattis tristique. Suspendisse quis risus et leo placerat pulvinar. Praesent et efficitur risus, non bibendum nunc. Sed malesuada augue non sem bibendum, vel hendrerit justo blandit. Duis porttitor dignissim quam, sodales pulvinar est commodo non. Donec tristique tristique odio, eu maximus lectus. Aenean vestibulum ante risus, vitae tincidunt lacus ultrices sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sit amet tortor fringilla, ultrices lorem porta, sodales quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vestibulum rhoncus bibendum. Sed id arcu nulla. Fusce velit odio, molestie non iaculis at, scelerisque sit amet orci. Vestibulum at nisi ipsum. Curabitur lorem velit, volutpat et lectus a, semper volutpat ipsum. In id aliquam risus. Donec rutrum eros nulla, quis tincidunt mauris viverra eget. Nam luctus ipsum a elementum eleifend. Sed erat augue, lacinia sit amet tristique tincidunt, suscipit id nibh. Curabitur eget tellus ac ipsum bibendum gravida in eu lacus. Nunc id fringilla eros, ac vestibulum magna. Curabitur elit lorem, suscipit sed tincidunt vel, mattis sit amet nibh. Fusce pretium eu eros ut rhoncus. Nulla ut elementum dolor. Morbi tempor interdum sapien, et mattis sapien dictum sit amet. Fusce pharetra eros vel aliquet pulvinar. Proin sodales metus sit amet nulla vestibulum, quis faucibus turpis finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum ligula sit amet scelerisque tincidunt. Proin nec varius est, sed faucibus erat. Cras metus erat, mollis vitae urna id, consequat sagittis nisl. Mauris fringilla, leo sed viverra iaculis, est nisi sodales magna, viverra vehicula enim ipsum id enim. Vivamus non ex volutpat, commodo leo sed, facilisis felis. ",
      { delay: 0 }
    );
    cy.get('[data-testid="btn"]').click();
    cy.url().should("include", "/");
  });
});
