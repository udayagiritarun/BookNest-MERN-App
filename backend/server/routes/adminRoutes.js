import express from 'express';
const router = express.Router();
import {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    getSellers,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/users').get(protect, admin, getUsers);
router.route('/sellers').get(protect, admin, getSellers);
router
    .route('/users/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;