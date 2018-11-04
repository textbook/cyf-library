import { dataQa } from "./utils";

describe("Sort and Filter Functionality", () => {
  beforeEach(() => {
    cy.seed("multiple-resources.json");
    cy.visit("/");
  });

  it("should allow the user to filter displayed resources by title", () => {
    cy.get(dataQa("search-input")).type("angular");
    cy.get(dataQa("search-button")).click();

    const expectedNames = ["AngularJS", "Angular"];
    cy.get(dataQa("resource")).each((element, index) => {
      cy.wrap(element)
        .find(dataQa("resource-name"))
        .should("have.text", expectedNames[index]);
    });
  });

  it("should allow the user to filter displayed resources by description", () => {
    cy.get(dataQa("search-input")).type("javascript");
    cy.get(dataQa("search-button")).click();

    const expectedNames = ["Node", "React"];
    cy.get(dataQa("resource")).each((element, index) => {
      cy.wrap(element)
        .find(dataQa("resource-name"))
        .should("have.text", expectedNames[index]);
    });
  });

  it("should order resources latest first by default", () => {
    const expectedNames = ["AngularJS", "Node", "Angular", "React"];
    cy.get(`${dataQa("sort-select")} option:checked`).should(
      "have.text",
      "Sort by date"
    );
    cy.get(dataQa("resource")).each((element, index) => {
      cy.wrap(element)
        .find(dataQa("resource-name"))
        .should("have.text", expectedNames[index]);
    });
  });

  it("should allow ordering by resource name", () => {
    cy.get(dataQa("sort-select")).select("Sort by name");

    const expectedNames = ["Angular", "AngularJS", "Node", "React"];
    cy.get(dataQa("resource")).each((element, index) => {
      cy.wrap(element)
        .find(dataQa("resource-name"))
        .should("have.text", expectedNames[index]);
    });
  });
});
