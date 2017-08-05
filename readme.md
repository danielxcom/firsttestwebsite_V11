#YelpCamp

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
   * Name
   * Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template



##Refactor Mongoose Code
* Create a mdoels directory
* Use module exports
* Require everything correctly!
* 

//MUST send to the app. We run into an empty object if we don't on the main app.js file.
//so basically, we have a bunch of offices. 
//and as the company grows.
//we must use more and more office spaces; expand.
//thus, in every part of the building, there are different offices that direct back to the head office.
//with their own jobs that help the main office do it's job. 
//without exports, we cannot communicate to the head office.
//without Campground = require("...") we can't let those guys from Campground office in to show off their work.


#Add Seed File
* add a seeds.js file
* Run the seeds file every time the server starts.
* 


#Add the comment model!
* Make our errors go away!
* Display comments on campground show page
* 


#Comment New/Create
* Discusee nested routes
* Add the comment new and create routes
* Add the new comment form
* 


#Style Show Page
* Add sidebar to show page
* Display comments nicely.
* 


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dog
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds    
SHOW    /campgrounds/:id

NEW     /campgrounds/:id/comment/new    GET
CREATE  /campgrounds/:id/comment        POST


