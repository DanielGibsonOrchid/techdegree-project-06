
/********************
 * Require the necessary dependencies *
********************/
const express = require('express');
const data = require('./data.json');
const projects = data.projects;
const path = require('path');

/********************
 * Create the app *
********************/
const app = express();

/********************
 * Middleware *
********************/
// set the view engine to pug
app.set('view engine', 'pug');

// route for static files
app.use('/static', express.static('public'));

/********************
 * Routes *
********************/
// homepage
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// project pages
data.projects.forEach((project) => {
    app.get(`/project/${project.id}`, (req, res) => {
        res.render('project', {project});
    });
});

// "/project" redirects to the first project
app.get('/project', (req, res) => {
    res.redirect('/project/0');
});

/********************
 * Error Handling *
********************/
app.use((req, res, next) => {
    const err = new Error('Sorry, this page was not found');
    err.status = 404;
    console.error(`${err.status}: Page not found`);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Run the app on localhost:3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The application is running on Localhost:${port}`));