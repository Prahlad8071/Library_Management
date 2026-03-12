const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
// @access  Public
const addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Get all book records
// @route   GET /books
// @access  Public
const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Search book by title
// @route   GET /books/search?title=xyz
// @access  Public
const searchBooks = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (!title) {
            res.status(400);
            throw new Error('Title query parameter is required for searching');
        }
        
        // Using regex for case-insensitive partial match
        const books = await Book.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(books);
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        next(error);
    }
};

// @desc    Get book by ID
// @route   GET /books/:id
// @access  Public
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            res.status(404);
            throw new Error('Book not found');
        }
        
        res.status(200).json(book);
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(400); // likely an invalid ObjectId format
        }
        next(error);
    }
};

// @desc    Update book details
// @route   PUT /books/:id
// @access  Public
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            res.status(404);
            throw new Error('Book not found');
        }
        
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json(updatedBook);
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(400);
        }
        next(error);
    }
};

// @desc    Delete book record
// @route   DELETE /books/:id
// @access  Public
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            res.status(404);
            throw new Error('Book not found');
        }
        
        await book.deleteOne();
        res.status(200).json({ message: 'Book removed' });
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(400); // likely an invalid ObjectId format
        }
        next(error);
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
};
