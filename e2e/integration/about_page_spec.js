import { dataQa } from "./utils";

describe("About Page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should show the page title", () => {
    cy.get(dataQa("page-title")).should("have.text", "About");
  });
});
