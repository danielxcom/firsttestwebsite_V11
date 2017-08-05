var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});


//gives native passport-local-mongoose functionality to UserSchema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);