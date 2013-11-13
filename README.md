## IO Lab Project 3

####Project Title

Movie Together

####Description

Our application leverages movie reviews collected from over 800 users to recommend movies that two people of different age, gender, and occupation might like to watch. We built a simple collaborative filter which finds other users that are similar to you and your friends and then recommends movies that those users enjoyed.

We display the movie data by showing colored circles which represent movies. The size of the circle is determined by how popular the movie was (popularity score is a raw score of users who rated the movie either 4 or 5 stars). Movies on the left of the screen are movies that user1 might enjoy that user2 might not. Movies in the center are those that both people would enjoy. And movies on the right are movies user2 would enjoy that user2 might not.

When a user hovers over a movie circle, the title of the movie and the popularity score is shown. Clicking the hovercard will take the user to the movie's imdb page.

The movie rating data is from the MovieLens 100K data set http://www.grouplens.org/datasets/movielens/


####Team Members, Roles, Technologies

* Christopher Fan - d3 visualization
* Chalenge Masekera - d3 visualization
* Vanessa McAfee - javascript for finding recommended movies
* Kelly Park - HTML/CSS

####Demo
http://people.ischool.berkeley.edu/~chrisfan/IOLabPJ3/index_kp_dec.html 

#### Files
HTML: 
* index_kp_dec.html > Forms and SVG canvas

CSS: 
* Using Bootstrap
* _css/style.css > CSS Styles


Javascript: 
* Using Jquery and D3
* _js/script.js > Event Handlers and Data Manipulation
* _js/bubbles.js > D3 visualization

Data:
http://people.ischool.berkeley.edu/~vanessa/movies.jsonp >> List of movies and data

####Known Bugs

1.
2.
3.
