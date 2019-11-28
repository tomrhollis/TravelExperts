const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const sequelize = require('sequelize');
const db = new sequelize('travelexperts', 'tombot', '834sopsid', {
    host: 'localhost', // should this be 'db'?
    dialect: 'mysql'
});
var port = 8027;

function sendToLog(message) {
	var todaysDate = moment().format("MMMM DD, YYYY | HH:mm:ss.SSS");
	console.log("[" + todaysDate + "] " + message);
}

app.listen(port, () => {
    sendToLog("Started Web Server on port " + port);
});

//STATIC PAGES
//app.use(express.static("views", {extensions: ["html"]}));
app.use(express.static("public"));
app.use(express.static("public/media"));


//DYNAMIC PAGES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index', {});
});
app.get('/index.html', (req, res) => {
    res.render('index', {});
});
app.get('/register.html', (req, res) => {
    res.render("register", {});
});
app.get('/contact.html', (req, res) => {
    res.render("contact", {});
});
app.get('/vacationpackages.html', (req, res) => {
    res.render("vacationPackagesUPDATED", {});
});

/*
app.get("/postdone", (req, res) => {
    res.send('<!DOCTYPE html><html lang="en"><body><h1>Thanks for your submission!</h1></body></html>');
});
*/

//BEGIN FORM PROCESSING SECTION
app.use(express.urlencoded({extended: true}));
app.post("/posttest", (req, res) => {
    console.log("received post request");
});
//END FORM PROCESSING SECTION


//BEGIN ERROR HANDLING
app.use((req, res, next) => {
    res.status(404).send('<!DOCTYPE html><html lang="en"><body><h1>404: File not found</h1></body></html>');
});

app.use(function (err, req, res, next) { //from expressjs.com
    console.error(err.stack);
    res.status(500).send('<!DOCTYPE html><html lang="en"><body><h1>500: Something broke bigtime! What did you do?!</h1></body></html>');
});
//END ERROR HANDLING