//create a bunch of campgrounds.
//error driven development - write some code to make the error go away - get a new error
//circle of life - kill-me.
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var data = 
[
    {
     name:"Legate Lanius Camp",
     image: "https://vignette4.wikia.nocookie.net/fallout/images/b/be/LegatesCamp.jpg/revision/latest?cb=20140623211727",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
     {
     name:"Zion National Park",
     image: "https://vignette1.wikia.nocookie.net/fallout/images/4/49/Zion_National_Park.jpg/revision/latest?cb=20110511221025",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
     {
     name:"The Strip",
     image: "http://vignette3.wikia.nocookie.net/fallout/images/a/a3/Ranger_at_New_Vegas_entrance.jpg/revision/latest?cb=20110721063233",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
    ]



    function seedDB() {
    // Comment.remove({}, function(err){
    //     if(err){console.log(err)} else {console.log("Comments successfully removed")}
    // });
        //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){ console.log(err)}
        console.log("remove campgrounds");
        //add a few campgrounds. added into callback to prevent semantic error.
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a campground");
                    //add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err)
                            {
                                console.log(err)
                                
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            })
        });

    });
}
module.exports = seedDB;