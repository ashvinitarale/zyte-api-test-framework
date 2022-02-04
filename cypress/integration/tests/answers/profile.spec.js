///<reference types="cypress" />

describe('Posts API', () => {
  it('returns a JSON data', () => {
    cy.request('/profile')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('Manager can search profiles by name in order to validate if they exist', () => {
    cy.request('/profile?name=typicode').its('status').should('be.equal', 200);
  });

  it('Manager can search profiles by name in order to validate if they doesnt exist', () => {
    cy.request('/profile?name=xyz').its('status').should('be.equal', 200);
  });


  it('Create new user profile', () => {
    cy.api({
      method: 'POST',
      url: '/profile',
      body: {
        name: 'profileusingapi'
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal('profileusingapi');
    });
  });

  });
