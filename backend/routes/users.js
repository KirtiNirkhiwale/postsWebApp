var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);
    
    var errors = req.validationErrors();
    if(errors) {
        res.send(errors);
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        
        User.createUser(newUser, function(err, user){
            if(err) res.status(400).send({sucess: false, message: err});
            res.send({sucess: true, message: user});            
        });
    }
});

router.get('/login', function(req, res){
    res.render('login');
    
});

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy( function (username, password, done){

    User.getUserByUsername(username, function (err, user){

        if(err) throw err;
        if(!user) {
            return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password, function (err, isMatch){
            if(err) throw err;
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid password'})
            }
        });
    });

}))

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(400).send({success: false, message: 'User not found'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({success: true, message: user});
      });
    })(req, res, next);
  });

module.exports = router;