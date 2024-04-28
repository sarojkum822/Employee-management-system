import express from 'express';
import { Logout, getAllUsers, getMyProfile, login, register } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);
router.post("/logout", Logout);
router.get("/me", isAuthenticated, getMyProfile);






export default router;