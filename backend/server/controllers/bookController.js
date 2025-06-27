import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Create a book
// @route   POST /api/books/create
// @access  Private/Seller
const createBook = asyncHandler(async (req, res) => {
  const { title, author, price, description, genre, stockCount, coverImage } = req.body;

  // Validate required fields
  if (!title || !author || !price || !description || !genre) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const book = new Book({
    title,
    user: req.user._id, // the logged-in seller
    price: Number(price),
    author,
    coverImage: coverImage || '/images/sample.jpg',
    genre,
    stockCount: Number(stockCount) || 0,
    numReviews: 0,
    description,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id/edit
// @access  Private/Seller
const updateBook = asyncHandler(async (req, res) => {
  const { title, price, description, author, coverImage, genre, stockCount } = req.body;
  const book = await Book.findById(req.params.id);

  if (book) {
    // Check if the user is the owner of the book or an admin
    if (book.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this book');
    }

    book.title = title || book.title;
    book.price = price !== undefined ? Number(price) : book.price;
    book.description = description || book.description;
    book.author = author || book.author;
    book.coverImage = coverImage || book.coverImage;
    book.genre = genre || book.genre;
    book.stockCount = stockCount !== undefined ? Number(stockCount) : book.stockCount;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // Validate input
  if (!rating || !comment) {
    res.status(400);
    throw new Error('Please provide both rating and comment');
  }

  if (rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  const book = await Book.findById(req.params.id);

  if (book) {
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Book already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    book.reviews.push(review);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;

    await book.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
};