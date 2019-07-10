import task from "../fixtures/models/task";
describe("Knowledge Base Application", () => {
  it("Create a new task", () => {
    cy.visit("/todo");
    cy.get('input[id="addInput"]')
      .type(task.text)
      .should("have.value", task.text);
    cy.get("#addButton").click();
    cy.get(".list-item").should("have.length", 3);
  }),
    it("Reverse and Search after that", () => {
      cy.get("#reverseButtonId").click();
      cy.get('input[id="searchInputId"]')
        .type("typing")
        .should("have.value", "typing");
      cy.get("#searchButtonId").click();
      cy.contains(task.text).click();
    }),
    it("Testing Navigations", () => {
      cy.get(".el-menu__item")
        .contains("Navigate to Progress Bar")
        .click()
        .url()
        .should("include", "/progress");
      cy.get(".el__submenu")
        .contains("Navigate between ToDo")
        .click()
        .url()
        .should("include", "/progress");
      cy.get(".el-menu-item")
        .contains("Todos on Yesterday")
        .click()
        .url()
        .should("include", "/prevdaytodo");
      cy.get(".el-menu-item")
        .contains("Todos on Today")
        .click()
        .url()
        .should("include", "/todo");
    }),
    it("Editing", () => {
      cy.get(".el-icon-edit")
        .first()
        .click();
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
      cy.get(".list-item").should("have.text", "Some edited text");
    }),
    it("Test disabled Add", () => {
      cy.get('input[id="searchInputId"]').type(task.text);
      cy.get("#searchButtonId").click();
      cy.get("#addButton").should("have.attr", "disabled");
      cy.get('input[id="addInput"]').should("have.attr", "disabled");
    }),
    it("Search, Delete, Reverse and Add", () => {
      cy.get("#searchButtonId").click();
      cy.get("#reverseButtonId").click();
      cy.get(".el-icon-delete")
        .first()
        .click();
      cy.get(".list-item").should("have.length", 2);
      cy.get('input[id="addInput"]')
        .type(task.text)
        .should("have.value", task.text);
      cy.get("#addButton").click();
      cy.get(".list-item").should("have.length", 3);
    });
});
