var express = require("express");

//ISSUE: if we try to add comments now, it wont find the campground ejs code.
//only finds a null instead. Thus, we must understand that, our :id is not making it through
//to our comments route. we fix this by putting obj in express.Router({}) in comments.js

var router = express.Router({mergeParams: true});
//!!!explanation:mergeParams does is merge any req.params that exists at the time the router is entered. !!!
//it all depends on how you want sub router to behave.
//this router will inherit off the main app.js file from app.use(...)
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//==============================================================================================

// COMMENT ROUTES

//----==========================================================================================

router.get("/new", middleware.isLoggedIn, function(req, res){
    //   res.send("THIS WILL BE THE COMMENT FORM"); 
    //what we want is to find campground by id. send through as we render.
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
                res.render("comments/new", {campground: campground});
        }
    })

});

//!!!THEORETICALLY, if left simplified, this app.post is only hidden, thus, someone can just send a 
//post request and activate it on their own. Dangerous!!!
//so we add our middleware isLoggedIn
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campgrounds using ID
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          //incase database screws up.
          req.flash("error", "Something went wrong with DB potentially.");
          console.log(err);
          res.redirect("/campgrounds");
      } else {
        //   console.log(req.body.comment);
        //   var text = req.body.text;
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //add username and id to comment
                  //console.log("New content's user name will be: " + req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                  //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added/created comment.");
                    res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
   //create new comment
   //then we want to connect new comment to campground
   //redirect to campground show page.
});

//EDIT Comments Route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    // req.param.id
    //we have this already defined in app.js defined with /campgrounds/:id/comments
    
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE ROUTE

//us a put request to some comment_id.

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE:

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;