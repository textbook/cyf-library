import { dataQa, dataQaValue } from "./utils";

describe("Home Page", () => {
  beforeEach(() => {
    cy.seed("single-resource.json");
    cy.visit("/");
  });

  it("should show the site title", () => {
    cy.title().should("equal", "CYF Library");
    cy.get(dataQa("site-title")).should("have.text", "Resource library");
  });

  it("should show the default resources", () => {
    cy.get(dataQa("resource")).should("have.length", 1);
    cy.get(dataQa("resource")).within(() => {
      cy.get(dataQa("resource-name")).should("have.text", "React");
      cy.get(dataQa("resource-description")).should(
        "have.text",
        "The official website for React"
      );
      cy.get(dataQa("resource-link"))
        .should("have.text", "View")
        .and("have.prop", "href", "https://reactjs.org/");
      cy.get(dataQa("resource-created")).should(
        "have.text",
        "Added a few seconds ago"
      );
    });
  });

  it("should show a link to the resource's creator", () => {
    cy.get(dataQa("resource")).within(() => {
      cy.get(dataQa("resource-creator"))
        .should("have.text", "textbook")
        .and("have.prop", "href", "https://github.com/textbook");
    });
  });

  it("should show the categories of the resource", () => {
    const expectedCategories = ["react", "javascript"];
    cy.get(dataQa("resource"))
      .first()
      .within(() => {
        cy.get(dataQa("resource-category")).each((el, index) => {
          cy.wrap(el).should("have.text", expectedCategories[index]);
        });
      });
  });

  it("should provide a link to the about page", () => {
    cy.get(`${dataQa("nav-link")}${dataQaValue("about")}`)
      .first()
      .should("have.text", "About")
      .click();
    cy.get(dataQa("page-title")).should("have.text", "About");
  });

  it("should allow the user to navigate by category", () => {
    cy.get(`${dataQa("resource-category")}${dataQaValue("react")}`).click();
    cy.get(dataQa("page-title")).should("have.text", "Category: react");
  });
});
