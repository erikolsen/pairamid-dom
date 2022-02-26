context("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("lets you create a new team", () => {
    cy.intercept("POST", "/team", { fixture: "newTeam.json" });
    cy.intercept("GET", "/team/*", { fixture: "newTeam.json" });
    cy.intercept("GET", "/team/*/users", { fixture: "newTeamUsers.json" });
    cy.intercept("PUT", "/team/*/role/*", { fixture: "newRoleQA.json" });

    cy.get("[data-cy='team-name-input']")
      .first()
      .type("Test Team", { force: true });
    cy.get("[data-cy='team-name-submit']").first().click();

    const role1 = "QA";
    const color1 = "#3ecc8e";

    cy.get("[data-cy='role-card']").within(() => {
      cy.get("[data-cy='Edit']").click();
    });
    cy.get("[data-cy='role-name-input']").clear({ force: true });
    cy.get("[data-cy='role-name-input']").type(role1, { force: true });
    cy.get("[data-cy='role-color-input']")
      .invoke("val", color1)
      .trigger("change");
    cy.get("[data-cy='role-submit']").click();
  });
});
