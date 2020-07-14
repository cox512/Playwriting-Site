# Playwriting-Site
My personal playwriting website

# Technologies Used
HTML5, CSS3, BOOTSTRAP, JAVASCRIPT, JQUERY, GIT, HEROKU, EXPRESS.JS, EJS, MONGODB, MONGOOSE, MULTER.JS, BCRYPT, NODE.JS, EXPRESS-SESSION

# Goal
My goal was to create a website for my playwriting work that users can go to to learn a little about my philosphy towards my theatre work as well as see a list of my plays with their production information (cast size, development history, synopsis, etc). I don't want to take a lot of time to make updates to it when I write a new piece or have more information to add to an existing one. I decided it would make sense to have a form that I can fill out to add information about a new play as well as upload a production or workshop photo. The plan is to make the page style itself dynamically, putting the photo in the background and laying out the play details in the correct location. I also added an edit and update route for each play so I can add information to them as time goes on.

In order to make sure the general public can't make changes to the site, I have an "unlisted" path for creating a new user. There, I can create a user name and a password. In order to access the pages to edit or add plays, the user has to sign in under the "admin login" section. Once they do, they have access to the "Create New Play" page. A logged-in account also displays "edit" and "delete" buttons next to the play titles in the Index Page.

# Unsolved Problems
After a bit of a struggle, I finally got Multer to work for uploading images to Mongo. I still need to add a function to remove images though. Right now when I go to edit a play, if there's already an image attached to it, I'm stuck with using that image.

I wanted to learn more about proper error notifications and get that implemented, but I ran out of time.

The part of this project that excites me the most is seeing if I can get the site to dynamically create individual pages for these plays in a stylish way. There's a lot of things that can go screwy when you don't know exactly how much and what type of information you're going to have for a future play. Some plays don't need a lot of explaining, while others have more of a background story and a longer history of production and development. I haven't gotten all the way through the styling of these pages yet so we'll have to see how that goes.

There's a number of pages I still want to add. A "News" section (which may be incorporated into the "About" page), a collaborators page highlighting the people and organizations I've worked with and linking to their pages, as well as a contact page that a user can use to send me a message. These will all have to wait for now.

# LINK TO THE APP'S HEROKU SITE
https://playwriting-site.herokuapp.com/

If you would like to log-in feel free to use 
username: cox512
password: howdy
