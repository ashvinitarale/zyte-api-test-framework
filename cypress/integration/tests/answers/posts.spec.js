///<reference types="cypress" />

describe('Post API', () => {

  it('returns a JSON data', () => {
    cy.get('/posts')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });
  it('loads all the posts successfully', () => {
    cy.api({ url: '/posts' }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it('User can see post by post id', () => {
    cy.api({url:'posts?id=2'})
    .its('status')
    .should('be.equal', 200);
  });

  it('User can see post by using title and author', () => {
    cy.api({ url: '/posts?title=json-server&author=typicode' })
    .its('status')
    .should('be.equal', 200);;
  });

  it('Create new content', () => {
    cy.api({
      method: 'POST',
      url: '/posts',
      body: {
        id: 4,
        title: 'testtitle',
        author: 'testauthor',
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal(4);
    });
  });
});
