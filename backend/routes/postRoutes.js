const express = require('express');
const router = express.Router();


// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to create a new post
router.post('/', postController.createPost);

// Route to get a single post by ID
router.get('/:id', postController.getPostById);

// Route to update a post by ID
router.put('/:id', postController.updatePost);

// Route to delete a post by ID
router.delete('/:id', postController.deletePost);

module.exports = router;