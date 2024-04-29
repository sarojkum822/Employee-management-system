import express from 'express';
import { Logout, getMyProfile, login, register } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


// router.post("/all", isAuthenticated, getAllUsers);
router.post("/logout", Logout);
router.get("/me", isAuthenticated, getMyProfile);

router.post("/new", register);
router.post("/login", login);



export default router;