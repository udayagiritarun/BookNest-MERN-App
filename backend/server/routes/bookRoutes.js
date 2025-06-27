import express from 'express';
const router = express.Router();
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
} from '../controllers/bookController.js';
import { protect, admin, seller } from '../middleware/authMiddleware.js';

router.route('/').get(getBooks);
router.route('/:id').get(getBookById);
router.route('/:id/reviews').post(protect, createBookReview);

// Seller & Admin Routes
router.route('/create').post(protect, seller, createBook); // Simplified for direct creation
router.route('/:id/edit').put(protect, seller, updateBook);

// Admin Only Route
router.route('/:id').delete(protect, admin, deleteBook);

export default router;