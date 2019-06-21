describe("My First Test", function() {
  it("Visits the app", function() {
    cy.visit("http://localhost:8080/todo");

    cy.focused().should('have.class', 'addInput')
  });
});
