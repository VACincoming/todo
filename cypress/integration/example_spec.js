import task from "../fixtures/models/task";
describe("Knowledge Base Application", () => {
  it("Create a new task", () => {
    cy.visit("/todo");
    // cy.focused().should("have.id", "addInput");
    cy.get('input[id="addInput"]')
      .type(task.text)
      .should("have.value", task.text);
    cy.get("#addButton").click();
    cy.get("#reverseButtonId").click();
    cy.get('input[id="searchInputId"]')
      .type("typing")
      .should("have.value", "typing");
    cy.get("#searchButtonId").click();

    cy.contains(task.text).click();

    cy.get(".el-menu__item")
      .contains("Navigate to progressBar")
      .click();
    cy.get(".el__submenu")
      .contains("Navigate between ToDo")
      .click();
    cy.get(".el-menu-item")
      .contains("Todos on yesterday")
      .click();
    cy.get(".el-menu-item")
      .contains("Todos on today")
      .click();

    cy.get(".el-icon-edit").click();
    cy.get(".el-button")
      .contains("Edit")
      .click();

    cy.get(".el-icon-edit").click();
    cy.get(".el-message-box")
      .find('[type="text"]')
      .type(task.edit, { force: true });
    cy.get(".el-button")
      .contains("Edit")
      .click();

    cy.get("#searchButtonId").click();
    cy.get("#reverseButtonId").click();

    cy.get(".el-icon-delete")
      .first()
      .click();

    cy.get('input[id="addInput"]')
      .type(task.text)
      .should("have.value", task.text);
    cy.get("#addButton").click();
  });
});
