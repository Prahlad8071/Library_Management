const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required']
    },
    publicationYear: {
        type: Number
    },
    totalCopies: {
        type: Number,
        required: [true, 'Total Copies is required'],
        min: [1, 'Total Copies must be a positive number']
    },
    availableCopies: {
        type: Number,
        default: function() { return this.totalCopies; }
    },
    shelfLocation: {
        type: String
    },
    bookType: {
        type: String,
        enum: ['Reference', 'Circulating'],
        default: 'Circulating'
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
