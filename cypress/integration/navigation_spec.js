describe("Do navigation", () => {
  it("Choose Progress Bar", () => {
    // beforeEach(() => {
    //   cy.visit("/todo");
    // });
    cy.visit("/todo");
    cy.get(".el-menu__item").contains("Navigate to progressBar").click();
  })
})