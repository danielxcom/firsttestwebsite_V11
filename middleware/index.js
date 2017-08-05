var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware
var middlewareObj = {};


//middleware for campgroundownership

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
             //does user own campground.
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else {
                //does user own the campground?
                // if(campground.author.id === req.user._id) 
                // console.log(foundCampground.author.id); //prints 5979cf33d759f4c83b77eada
                // //object. Mongoose object. toString version of it.
                // console.log(req.user._id); //prints 5979c8757ae8466539234f3d
                // //a string.
                
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else { //inc its another user than the one who made it.
                    req.flash("error", "you don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
        } else {
            req.flash("error"< "You need to be logged in to do this action.");
            res.redirect("back"); //take user to previous page.
        }
};

//middleware for comment ownership.
middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
             //does user own campground.
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("back");
            } else {
                //does user own this comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else { 
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
        } else {
            req.flash("error", "Not Logged In");
            res.redirect("back"); //take user to previous page.
        }
};

//middleware for session while logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //check if logged in. 
    //gives us a way to access this on next request. 
    //flash only gives the message per req. 
    //would still require .redirect to go back to login page.
    //flash just activates the error msg on our login.ejs code.
    req.flash("error", "Error, you need to be logged in to do this action.");

    res.redirect("/login");
};


module.exports = middlewareObj;