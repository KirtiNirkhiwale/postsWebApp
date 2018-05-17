var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username : {
        type: String,
        index:true
    },
    password : {
        type: String
    },
    email : {
        type: String
    },
    name : {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {

    User.count({ username: newUser.username })
      .then((count) => {
        if (count > 0) {
            User.count({ email: newUser.email })
            .then((count) => {
                if (count > 0) {
                    callback('Username and Emailid already exists.', newUser);
                } else {
                    callback('Username already exists.', newUser);
                }
            }
            )
        } else {
            User.count({ email: newUser.email })
            .then((count) => {
                if (count > 0) {
                    callback('Email already exists.', newUser);
                } else {
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(newUser.password, salt, function(err, hash){
                            newUser.password = hash;
                            newUser.save(callback);
                        })
                
                    })
                }
            })
        }
      });
    


}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}


module.exports.getUserByUsername = function(username, callback){
    var query = { username: username};
    User.findOne(query, callback);
}

//getUserById
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
