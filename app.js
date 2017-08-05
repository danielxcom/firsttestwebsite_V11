var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    passport    = require("passport"),
    User        = require("./models/user"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash");
    
    
//REFACTOR TIME
//requiring routes.

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
//export a function seedDB
// seedDB(); //seed db
mongoose.connect("mongodb://localhost/yelp_camp_v8");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//served the public directory.
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());

//***********************
// PASSPORT CONFIGURATION
//***********************

app.use(require("express-session")({
    //pass in an obj.
    //any secret that we want.
    //Literally any secret will do, the crawlspace where all the dead bodies are, the secret fetish folders, embarassing school moments.
    //secret is just used to compute the hash.
    secret: "Sloppy Joes is great",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for currentUser
app.use(function(req, res, next){
    //wew lads lets break it down.
    //app.locals obj has properties that are local to the entire app. Once set, lifetime properties throughout runtime of app.
    //in contrast, res.locals is scoped, valid for lifetime of the req.
    res.locals.currentUser = req.user;
    //need next to move onto the route handler.
    
    
    //for flash
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//for routes
app.use("/", indexRoutes);
//append for comments esp when it gets too long in prefix.
//ISSUE: if we try to add comments now, it wont find the campground ejs code.
//only finds a null instead. Thus, we must understand that, our :id is not making it through
//to our comments route. we fix this by putting obj in express.Router({}) in comments.js
app.use("/campgrounds/:id/comments", commentRoutes);
//append /campgrounds
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});