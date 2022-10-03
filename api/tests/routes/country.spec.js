/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { response } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'delisiosa comidasd klajsdklajlskd'
};

// xdescribe('Recipe routes', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   beforeEach(() => Recipe.sync({ force: true })
//     .then(() => Recipe.create(recipe)));

//   describe('GET /recipes', () => {
//     it('should get 200', () =>
//       agent.get('/recipes').expect(200)
//     );
//   });
// });

describe('Recipe routes', () => {
  it('hacer un GET a /recipes/:idReceta  sin una id valida data error404 ', async () => {
    const response = await agent.get('/api/recipes/asldkjhjaklsj');
    expect(response.statusCode).to.equal(404);
  });
})



// describe('POST /recipes', () => {  
//   it('should reply the POST method /api/recipe whith code 500 if name and summary is not sent', async () => {
//     // const res = await agent.post('/recipes').send({});
//     // expect(res.statusCode).to.equal(400);
   
//   });  
//   it('should reply the POST method /api/recipe with status code 200 if name, summary and dietTypes is sent', async () => {
//     recipePrueba={name: 'Ice Cream', summary: 'Refreshing option', diets: 'vegan'}
//     const res2 = await agent.post('/recipes').send(recipePrueba);
//     expect(res2.statusCode).to.equal(200);
//   })  
// });
