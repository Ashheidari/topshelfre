const request = require('supertest');
const app = require('./app.js');


describe('Test the book store API', () => {
	test('Test POST /books', () => {
    	return request(app)
        	.post('/books')
        	.send({id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99})
        	.expect(201);
	});

	test('Test GET /books/1', () => {
    	return request(app)
        	.get('/books/1')
        	.expect(200);
	});

	test('Test PUT /books/1', () => {
    	return request(app)
        	.put('/books/1')
        	.send({title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99})
        	.expect(200);
	});

	test('Test DELETE /books/1', () => {
    	return request(app)
        	.delete('/books/1')
        	.expect(200);
	});

	test('Test GET /books', () => {
    	return request(app)
        	.get('/books')
        	.expect(200);
	});
});