const express = require('express');
const { projects } = require('./data.json');
const path = require('path');

//Create the app
const app = express();

//middleware
// set the view engine to pug
app.set('view engine', 'pug');

// route for static files
app.use('/static', express.static('public'));

// routes
// homepage
app.get('/', (req, res) => {
    res.render('index', projects);
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// project pages
projects.forEach((project) => {
    app.get(`/project/${project.id}`, (req, res) => {
        res.render('project', {project});
    });
});
//redirect for /project to go to the first project
app.get('/project', (req, res) => {
    res.redirect('/project/0');
});

// error handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log("The application is running on localhost:3000")
});


/*
Add variables to require the necessary dependencies. You'll need to require:
- Express
- Your data.json file
- Optionally - the path module which can be used when setting the absolute path in the express.static function.

Set up your middleware:
- set your “view engine” to “pug”
- use a static route and the express.static method to serve the static files located in the public folder

Set your routes. You'll need:
- An "index" route (/) to render the "Home" page with the locals set to data.projects
- An "about" route (/about) to render the "About" page
- Dynamic "project" routes (/project or /projects) based on the id of the project that render
 a customized version of the Pug project template to show off each project. 
 Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.

*/