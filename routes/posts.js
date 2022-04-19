const express = require('express');
const { getPosts, createPost, getPostById } = require('../controller/posts');
const router = express.Router();

router.get('/', getPosts);
router.post('/create', createPost);
router.get('/:id', getPostById);

module.exports = router