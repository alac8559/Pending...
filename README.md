# Pending...
Team Number: 109-2

Team Members: Ben Dumois, Tainwei Zhao, Drew McFaul, Alexis Acevedo, Mingyuan Lu

Project Group For CSCI 3308 S20

Beepboop is a web-based Morse code training program that teaches users how to understand Morse code. The website includes a registration and login page, a short tutorial to get users started, a page where they can convert text to Morse code, and a page with a lesson system. The lesson system uses the Koch method to learn Morse code, where users are introduced to two letters to begin with, and a new letter or number is added in each additional lesson. The user can jump to any lesson they want, change how long they want each lesson's practice session to be, and receive feedback on their accuracy in the lesson.

In the code folder you will find the Home, registration, and translator folders. The Home folder contains the HTML, CSS, images, and JavaScript for the homepage, training page, and tutorial page. The registration folder contains the EJS, JavaScript, JSON, images, and CSS needed for the registration system. Finally, the translator folder contains the JavaScript and HTML for the translation page and other pages that use the Morse audio system.

The code on the master branch is up to date but not functional with the other tabs (Account, Home, Registration, etc.). Instead it is all intertwined in the server branch under the folder "testapp". We created another branch because we didn't want to mess up any of the code on the master branch. Also, the html pages had to be modified as node.js could not render static files, thus all the static files are stored in the public folder within the testapp folder.

In order to access our app go to https://mynewapp-alex.herokuapp.com/ . You will first have to register and then login before being able to access our Translator, Training, Tutorial, and Account pages.
