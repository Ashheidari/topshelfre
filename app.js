// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());
const request = require('supertest');
const isInputValid = require('./isInputValid')

let books = [];

app.get('/books', (req, res) => {
    res.status(200).json(books)
});

app.get('/books/:id', (req, res) => {

});

app.post('/books',isInputValid, (req, res) => {
    let {id,title,author,published_date,price} = req.body
    id = parseInt(id)
    price = parseFloat(price)

    const bookExists = books.some(b => b.id === id);
    if (bookExists){
        const error = new HttpError('Book Already exist', 409)
        return next(error)
    }
    const newBook = {id, title, author, published_date, price}
    books.push(newBook);
    res.status(201).json({message:"books created", books})
});

app.put('/books/:id', (req, res) => {
});

app.delete('/books/:id', (req, res) => {
});

app.listen(3000, () => console.log('Server running on port 3000'));






app.listen(3000, () => console.log('Server running on port 3000'));

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





