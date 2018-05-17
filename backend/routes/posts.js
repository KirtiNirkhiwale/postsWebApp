var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
/*
*
* APIs for getting, creating, updating and deleting posts from database and giving response
* Node JS + Express + MondoDB
*
*/

// fetch posts

router.get('/get-data', function(req, res){
   
    Posts.getPosts(function(err, allPosts){
        if(err) res.status(400).send({sucess: false, message: err});
        res.send({sucess: true, message: allPosts});            
    });
    
});

// insert posts
router.post('/insert', function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var author = req.body.author;
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('content', 'Content is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    
    var errors = req.validationErrors();
    if(errors) {
        res.status(400).send({sucess: false, message: errors});
    } else {
        var item = new Posts({
            title: title,
            content: content,
            author: author
        });
        
        Posts.insertPost(item, function(err, item){
            if(err) res.status(400).send({sucess: false, message: err});
            res.send({sucess: true, message: item});            
        });
    }
});

//update posts
router.post('/update', function(req, res, next) {
    var postID = req.body.postID;
    var title = req.body.title;
    var content = req.body.content;
    var author = req.body.author;

    req.checkBody('postID', 'ID is required').notEmpty();
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('content', 'Content is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    
    var errors = req.validationErrors();
    if(errors) {
        res.status(400).send({sucess: false, message: errors});
    } else {
        var item = new Posts({
            _id: postID,
            title: title,
            content: content,
            author: author
        });        
        Posts.updatePost(item, function(err, item){
            if(err) res.status(400).send({sucess: false, message: err});
            res.send({sucess: true, message: item});            
        });
    }
});

//delete posts
router.post('/delete', function(req, res, next) {
    var itemID = req.body.postID;
    Posts.deletePost(itemID, function(err, item){
        if(err) res.status(400).send({sucess: false, message: err});
        res.send({sucess: true, message: item});            
    });
});

module.exports = router;