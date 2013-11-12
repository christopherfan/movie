 //Variables to hold data from movies.jsonp file
var movies = movies_json;
var similar_users = similar_users_json;
var users_movies = users_movies_json;

$(document).ready(function() {
       
    // Based on users input, lookup users they are similar to, generate list of
    // recommended movies for user1, user2, and movies both users will like. 
    // Then display the movie data in the visualization canvas.
    $(document).submit( function () {

    		// Get users information and find their similar users
    		var user1_data = [];
    		var user2_data = [];
        
        user1_data.push( Number($("#age1").val()) );
        user1_data.push( Number($("#gender1").val()) );
        user1_data.push( Number($("#occupation1").val()) );
        user2_data.push( Number($("#age2").val()) );
        user2_data.push( Number($("#gender2").val()) );
        user2_data.push( Number($("#occupation2").val()) );
        
        user1 = user1_data.join(",") ;
        user2 = user2_data.join(",") ;

        user1_sim_users = similar_users[user1];
 				user2_sim_users = similar_users[user2];

        // Based on list of similar users, find movies each user will like.
        user1_movies = [];
        user2_movies = [];
        unique_movies1 = [];
				unique_movies2 = [];

        for (var i=0; i < user1_sim_users.length; i++) {
            for (var j=0; j < users_movies[user1_sim_users[i]].length; j++) {
                user1_movies.push(users_movies[user1_sim_users[i]][j]);
            }
        }

        $.each(user1_movies, function(i, el){
            if($.inArray(el, unique_movies1) === -1) unique_movies1.push(el);
        });

        for (var i=0; i < user2_sim_users.length; i++) {
            for (var j=0; j < users_movies[user2_sim_users[i]].length; j++) {
                user2_movies.push(users_movies[user2_sim_users[i]][j]);
            }
        }

        $.each(user2_movies, function(i, el){
            if($.inArray(el, unique_movies2) === -1) unique_movies2.push(el);
        });

        // Finds movies only recommended for user1, only recommended for user 2
        // and those recommended for both.
				only_user1 = [];
				only_user2 = [];
				both = [];
				
        for (var i=0; i<unique_movies1.length; i++) {
        	if (unique_movies2.indexOf(unique_movies1[i]) == -1) {
        		only_user1.push([Number(movies[unique_movies1[i]-1].num_ratings), unique_movies1[i]]);
        	}
        }

        for (var i=0; i<unique_movies2.length; i++) {
        	if (unique_movies1.indexOf(unique_movies2[i]) == -1) {
        		only_user2.push([Number(movies[unique_movies2[i]-1].num_ratings), unique_movies2[i]]);
        	}
        }

        for (var i = 0; i < unique_movies1.length; i++) {
          if (unique_movies2.indexOf(unique_movies1[i]) !== -1) {
            	both.push([Number(movies[unique_movies1[i]-1].num_ratings), unique_movies1[i]]);
          }
        }


        top_both = both.sort(sortNumber).reverse().slice(0,30);
        top_user1 = only_user1.slice(0,30);
        top_user2 = only_user2.slice(0,30);

        function sortNumber(a,b) {
					return a[0] - b[0];
				}

				recommended_both = [];
				recommended_user1 = [];
				recommended_user2 = [];

        
				for (var i=0; i<top_both.length; i++) {
					recommended_both.push(top_both[i][1])
				}

				for (var i=0; i<top_user1.length; i++) {
					recommended_user1.push(top_user1[i][1])
				}

				for (var i=0; i<top_user2.length; i++) {
					recommended_user2.push(top_user2[i][1])
				}

				console.log("Both: " + recommended_both);
				console.log("User1: " + recommended_user1);
				console.log("User2: " + recommended_user2);


        bubbles(recommended_user1,recommended_user2,recommended_both);

				//d3.json("_js/movies.json", function (data) {
				//    console.log(data);
				//    bubbles(data);
				//});
    	
    	return false;
    	event.preventDefault();	
	 
      });

  });

       