const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Find All
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({message: err});
    }
});


//Specific Post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});

//Store Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//Update Post
router.patch('/:postId', async (req, res) => {
    try {
      const post =  await Post.updateOne(
          { _id: req.params.postId }, 
          { $set: { title: req.body.title } }
        );
        res.json(post);
    } catch(err) {
        res.json({test: err});
    }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.postId });
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});




module.exports = router;