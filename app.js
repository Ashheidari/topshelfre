// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()
const isInputValid = require('./isInputValid')
const HttpError = require('./Http-error')
const PORT = process.env.PORT || 3000;

let books = [];

app.get('/books', (req, res, next) => {
    res.status(200).json(books)
});

app.get('/books/:id', (req, res, next) => {
    const bookId = req.params.id
    if (isNaN(parseInt(bookId))){
        const error = new HttpError('Invaild id format', 400)
        return next(error)
    }
    const book = books.find((b)=>b.id === parseInt(bookId));
    if (!book){
        const error = new HttpError('Book not found', 404)
        return next(error)
    }
    res.status(200).json(book);
});

app.post('/books',isInputValid, (req, res, next) => {
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

app.put('/books/:id', (req, res, next) => {
    const bookId = req.params.id
    if (isNaN(parseInt(bookId))){
        const error = new HttpError('Invaild id format', 400)
        return next(error)
    }
    const bookIndex = books.findIndex(b => b.id === parseInt(bookId));
    if (bookIndex === -1){
        const error = new HttpError('Book Not Found', 404)
        return next(error)
    }
    const updatedObject = {...req.body,id:parseInt(bookId),price:parseFloat(req.body.price) }
    books[bookIndex] = {...updatedObject}
    res.status(200).json({message:"book has been updated", book:books[bookIndex]})

});

app.delete('/books/:id', (req, res, next) => {
    const bookId = req.params.id
    if (isNaN(parseInt(bookId))){
        const error = new HttpError('Invaild id format', 400)
        return next(error)
    }
    const bookIndex = books.findIndex(b => b.id === parseInt(bookId));
    if (bookIndex === -1){
        const error = new HttpError('Book Not Found', 404)
        return next(error)
    }
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted" });
});



app.use((error, req, res, next)=>{
    if(res.headerSent){
        next(error);
    }
    console.log(error.statusCode)
    res.status(error.statusCode || 500);
    res.json({message:error.message || "an unknown error occured"})
})

app.listen(PORT, () => console.log('Server running on port 3000'));





// describe('Test the book store API', () => {
// 	test('Test POST /books', () => {
//     	return request(app)
//         	.post('/books')
//         	.send({id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99})
//         	.expect(201);
// 	});

// 	test('Test GET /books/1', () => {
//     	return request(app)
//         	.get('/books/1')
//         	.expect(200);
// 	});

// 	test('Test PUT /books/1', () => {
//     	return request(app)
//         	.put('/books/1')
//         	.send({title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99})
//         	.expect(200);
// 	});

// 	test('Test DELETE /books/1', () => {
//     	return request(app)
//         	.delete('/books/1')
//         	.expect(200);
// 	});

// 	test('Test GET /books', () => {
//     	return request(app)
//         	.get('/books')
//         	.expect(200);
// 	});
// });





