describe("Sort and Filter Functionality", () => {
  beforeEach(() => {
    cy.seed("multiple-resources.json");
    cy.visit("/");
  });

  it("should allow the user to filter displayed resources by title", () => {
    cy.get("[data-qa=search-input]").type("angular");
    cy.get("[data-qa=search-button]").click();

    const expectedNames = ["AngularJS", "Angular"];
    cy.get("[data-qa=resource]").each((element, index) => {
      cy.wrap(element).find("[data-qa=resource-name]").should("have.text", expectedNames[index]);
    });
  });

  it("should allow the user to filter displayed resources by description", () => {
    cy.get("[data-qa=search-input]").type("javascript");
    cy.get("[data-qa=search-button]").click();

    const expectedNames = ["Node", "React"];
    cy.get("[data-qa=resource]").each((element, index) => {
      cy.wrap(element).find("[data-qa=resource-name]").should("have.text", expectedNames[index]);
    });
  });

  it("should order resources latest first by default", () => {
    const expectedNames = ["AngularJS", "Node", "Angular", "React"];
    cy.get("[data-qa=sort-select] option:checked").should("have.text", "Sort by date");
    cy.get("[data-qa=resource]").each((element, index) => {
      cy.wrap(element).find("[data-qa=resource-name]").should("have.text", expectedNames[index]);
    });
  });

  it("should allow ordering by resource name", () => {
    cy.get("[data-qa=sort-select]").select("Sort by name");

    const expectedNames = ["Angular", "AngularJS", "Node", "React"];
    cy.get("[data-qa=resource]").each((element, index) => {
      cy.wrap(element).find("[data-qa=resource-name]").should("have.text", expectedNames[index]);
    });
  });
});
