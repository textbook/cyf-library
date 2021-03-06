import { dataQa } from "./utils";

describe("Category Page", () => {
  beforeEach(() => {
    cy.seed("multiple-resources.json");
    cy.visit("/category/angular");
  });

  it("should show the page title", () => {
    cy.title().should("equal", "CYF Library");
    cy.get(dataQa("page-title")).should("have.text", "Category: angular");
  });

  it("should show the specified resources", () => {
    const expectedNames = ["AngularJS", "Angular"];
    cy.get(dataQa("resource")).each((element, index) => {
      cy.wrap(element)
        .find(dataQa("resource-name"))
        .should("have.text", expectedNames[index]);
    });
  });

  it("should show an appropriate warning if no resources are found", () => {
    cy.visit("/category/bananas");
    cy.get(dataQa("no-resources-warning")).should(
      "have.text",
      "No resources found for specified category."
    );
  });
});
