describe('Assets Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/assets');
  });

  it('should navigate from Assets list to Asset details', () => {
    cy.get('mat-card.assets-item').should('have.length.at.least', 1);

    cy.get('mat-card.assets-item').first().click();

    cy.url().should('match', /\/assets\/\d+/);

    cy.get('.asset__name').should('exist').and('not.be.empty');
  });
});
