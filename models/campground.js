var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
           {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Comment"
               //we're not actually embedding the comments here, we're only embedding the ids or refs to here.
           }
       ]
});

//MUST send to the app. We run into an empty object if we don't on the main app.js file.
//so basically, we have a bunch of offices. 
//and as the company grows.
//we must use more and more office spaces; expand.
//thus, in every part of the building, there are different offices that direct back to the head office.
//with their own jobs that help the main office do it's job. 
//without exports, we cannot communicate to the head office.
//without Campground = require("...") we can't let those guys from Campground office in to show off their work.
module.exports = mongoose.model("Campground", campgroundSchema);