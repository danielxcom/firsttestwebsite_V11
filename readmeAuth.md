#Authentication     

##Intro to Auth
* What tools are we using?
*           Passport
*           Passport local
*           Passport local mongoose
* Walk through auth flor
* Discuss sessions
*       Express-Session
*       
* AUTHENTICATION is pretty complicated.
* lot of moving pieces
* need other people's tools to do this quickly and securely.
* User Auth: Are we going to teach from scratch, focusing on the ins and outs of every concept?
* User Auth: Or do we use the existing tools out there to do this with way faster less lines of code?
* We'd want both in an ideal world. 
* 
* local passport
* https://github.com/jaredhanson/passport-facebook fb authentication.
* 
* local FB passport
* https://github.com/jaredhanson/passport-local

* passport-local-mongoose
* https://github.com/saintedlama/passport-local-mongoose
* 


##THUS, Passport js: focus is making something neat

* Passport is authentication middleware for Node.js. Extremely flexible and modular, 
* Passport can be unobtrusively dropped in to any Express-based web application. 
* A comprehensive set of strategies support authentication using a username and password, 
* Facebook, Twitter, and more.
* 
*request are one-time when you send, no info on history, no link. One time transaction. 
* we want to stay logged in.
* we want to stay logged in incase we want to view secret.
* if there is no user in this session, dont let them view secfret, redirect to login.
* 

##Auth Code Along Part 1`
* Set up the folder structure
* Install needed packages
* Add root route and template
* Add secret route and template
* 


##Never Code Alone, Part 2
* Create User Model
* Configure passport (lots of code from diff libs)
* 


##Auth CodeAlong Part 3
* Add Register routes
* Add Register form
* 


##Auth CodeAlong Part 4
* Add Login routes
* Add Login Form
* 


##Auth CodeAlong Partt 5
* Add Logout Route
* Add isLoggedIn middleware
* 


## Auth 1.Add User Model

* Install all packages needed for auth
* Define User model
* 


##Auth 2. - Register
* Configure Passport
* Add register routes
* Add register template
* 


##Auth 3. - Login
* Add Login Routes
* Add login templates
* 


##Auth 4. - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly.
* 


##Auth 5. - Show/Hide Links
* Show/hide auth links in navbar correctly.
* 


##REFACTOR - The Routes
* Use Express router to reorganize all routes
* make sure all routes arent in the same damned app.js
* We have our:
        * Auth routes
        * Comment routes
        * Campground routes:
            * Show routes
            * New routes
            * Index routes
            * Create routes
            * etc.
            * 
            * 
            * 
##app.use("/", indexRoutes);
//append for comments esp when it gets too long in prefix.
//ISSUE: if we try to add comments now, it wont find the campground ejs code.
//only finds a null instead. Thus, we must understand that, our :id is not making it through
//to our comments route. we fix this by putting obj in express.Router({}) in comments.js
app.use("/campgrounds/:id/comments", commentRoutes);
//append /campgrounds
app.use("/campgrounds", campgroundRoutes);


##Users - Comments
* Associate users and comments
* Save author's name to a comment automatically.

*

##Users - Campground
* Prevent an unauthenticated user from creating a campground
* Save username-id to newly created campground
* 


##Editing Campgrounds
* Add Method Override
* Add Edit Route For Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem
* 


##Deleting Campgrounds
* Add Destroy Route
* Add Delete button
* 


##Authorization Part 1 : Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons.
* 


##Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route.
* 


Campground Destroy Route: /campground/:id
Comment Destroy Route:  /campground/:id/comments/:comment_id

##Deleting Comments 
* Add Destroy route
* Add Delete button
* 


##Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delte his/her comments.
* Hide/Show eidt and delete buttons.
* Refactor Middleware.
* 


