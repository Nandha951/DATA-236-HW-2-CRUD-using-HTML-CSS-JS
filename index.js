const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" }
];

app.get('/', function (req, res) {
    res.render('home', {
        books: books
    });
});

// Add Book
app.get('/add-book', function (req, res) {
    res.render('create');
});

app.post('/add-book', function (req, res) {
    const newBook = {
        "BookID": (books.length + 1).toString(),
        "Title": req.body.title,
        "Author": req.body.author
    };
    books.push(newBook);
    res.redirect('/');
});

// Update Book
app.get('/update-book', function (req, res) {
    res.render('update', { book: books.find(b => b.BookID === '1') }); // Pass the book data to the view
});

app.post('/update-book', function (req, res) {
    const bookIdToUpdate = '1';
    const updatedBook = {
        "BookID": bookIdToUpdate,
        "Title": req.body.title,
        "Author": req.body.author
    };

    books = books.map(book =>
        book.BookID === bookIdToUpdate ? updatedBook : book
    );

    res.redirect('/');
});

// Delete Book
app.get('/delete-book', function (req, res) {
    res.render('delete');
});

app.post('/delete-book', function (req, res) {
    const maxId = Math.max(...books.map(book => parseInt(book.BookID, 10)));
    books = books.filter(book => parseInt(book.BookID, 10) !== maxId);
    res.redirect('/');
});


app.listen(5003, function () {
    console.log("Server listening on port 5001");
});