var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//***********************
// AUTH ROUTES
//***********************

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//this route handles signup logic
router.post("/register", function(req, res){
    // User.register(new User({username: req.body.username})) cleanup
    var newUser = new User({username: req.body.username});
    //pass in new user, store crazy hash instead of pass.
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err);
            console.log(err); 
            //shortcircuit callback
            return res.render("register", {"error":err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp!" + user.username);
            res.redirect("/campgrounds");
        });
        
        //once the user has signed up in lines user.register
        //we log em in passport.authenticate lines.
        //and then we redirect them lastly to /campgrounds
    });
});


// show login form

router.get("/login", function(req, res){
    res.render("login"); //if we were to pass in individually. , {message: req.flash("error")}
});

//login route: handling login logic
router.post("/login", 
//start of middleware.
//when a request comes in from /login, passport.authenticate will run.
//app.post("/login", middleware, callback)
passport.authenticate("local", 
    {   //middleware will check the passport.use(new LocalStrategy(User.authenticate()); 
        //at the top of the code... soooo muchhhh coooodeeee.
        //goes to passport-local-mongoose: takes care of complex logic we didnt go over!!!
        //if successful campgrounds, if not, login.
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }),
    //end of middleware.
    function(req, res){
    //callback isn't toooo necessary, just keeping compliant with syntax.
});

//logic route for logout
router.get("/logout", function(req, res){
    //free logout from package.
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
})

module.exports = router;