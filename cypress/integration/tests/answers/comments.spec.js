/// <reference types="cypress" />

describe('Comments API', () => {

  it('returns a JSON data', () => {
    cy.request('/comments?id=1')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('User can see the comments by post id', () => {
    cy.api({url: '/comments?postId=1'}).then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it('User can comment on post of someone else', () => {
    cy.api({
      method: 'POST',
      url: '/comments?postId=1',
      body: {
        id: 3,
        body: 'some comment',
        postId: 1,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal(3);
    });
  });
});
