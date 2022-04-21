const express = require('express');
const { getPosts, createPost, getPostById, likePost } = require('../controller/posts');
const router = express.Router();

router.get('/', getPosts);
router.post('/create', createPost);
router.get('/:id', getPostById);
router.post('/like', likePost);

module.exports = router