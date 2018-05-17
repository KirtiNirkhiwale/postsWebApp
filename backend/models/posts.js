var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title : {
        type: String,
        index:true
    },
    content : {
        type: String
    },
    author : {
        type: String
    }
});

var Posts = module.exports = mongoose.model('Posts', PostSchema);

module.exports.getPosts = function(callback) {
    Posts.find()
      .then((data) => {
         callback(false, data);
    }).catch((err) => {
        callback(err, null);
   });
}

module.exports.insertPost = function(item, callback) {
    Posts.create(item)
      .then((data) => {
        callback(false, data);
    }).catch((err) => {
        callback(err, null);
   });
}

module.exports.updatePost = function(item, callback) {
    Posts.update({ _id: item._id }, item)
      .then((data) => {
        callback(false, data);
    }).catch((err) => {
        callback(err, null);
   });
}

module.exports.deletePost = function(itemID, callback) {
    Posts.findByIdAndRemove({ _id: itemID })
      .then((data) => {
        callback(false, data);
    }).catch((err) => {
        callback(err, null);
   });
}