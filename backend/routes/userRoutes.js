const express = require('express');
const router = express.Router();


// Route to register a new user
router.post('/register', userController.registerUser);

// Route to log in an existing user
router.post('/login', userController.loginUser);

// Route to get the current user's profile (protected route)
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// Route to update the user's profile (protected route)
router.put('/profile', authMiddleware.verifyToken, userController.updateProfile);

// Route to delete the user's account (protected route)
router.delete('/profile', authMiddleware.verifyToken, userController.deleteAccount);

module.exports = router;
