describe("Knowledge Base Application", () => {
  // beforeEach(() => {
  //   cy.fixture('models/task').as("task");
  // });
  it("Create a new task", () => {
    cy.visit("/todo");
    cy.focused()
      .should("have.id","addInput");
    cy
      .get('input[id="addInput"]')
      .type("Typing anything for this task")
      .should("have.value", "Typing anything for this task");
    cy.get("#addButton").click();
    cy.get("#reverseButtonId").click();
    cy
      .get('input[id="searchInputId"]')
      .type("typing")
      .should("have.value", "typing");
    cy.get("#searchButtonId").click();
  });
});
