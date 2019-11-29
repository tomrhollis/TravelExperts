const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const sequelize = require('sequelize');
const db = new sequelize('travelexperts', 'tombot', '834sopsid', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: sendToLog, // use the logging function below instead of console.log
    define: {
        timestamps: false // stops sequelize from trying to insert its own fields into the DB
    }
});
const customers = require('./models/customers').model(db);

var port = 8027;

function sendToLog(message) {
	var todaysDate = moment().format("YYYY-MM-DD | HH:mm:ss.SSS");
	console.log("[" + todaysDate + "] " + message);
}

db.sync().then(()=> { // with guidance from https://medium.com/@paigen11/sequelize-the-orm-for-sql-databases-with-nodejs-daa7c6d5aca3
    sendToLog('DB sync successful');
}); // future: any error handling?

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
    res.render('vacationPackagesUPDATED', {});
});
app.get('/index.html', (req, res) => {
    res.render('vacationPackagesUPDATED', {});
});
app.get('/register.html', (req, res) => {
    res.render("register", {});
});
app.get('/contact.html', (req, res) => {
    res.render("contact", {});
});
app.get('/vacationpackages.html', (req, res) => {
    res.render("vacationPackages", {});
});

//BEGIN FORM PROCESSING SECTION
app.use(express.urlencoded({extended: true}));
app.post("/regform", (req, res) => {
    customers.create(req.body).then(function (customers) { // with help from https://stackoverflow.com/questions/52161821/insert-a-new-record-in-nodejs-using-sequelize-post-method/52162653
        if (customers) { // if successful, send back to the main page for now
            res.redirect("/");
        } else {
            res.status(400).send('<!DOCTYPE html><html lang="en"><body><h1>400: Database Error</h1></body></html>');
        }
   });

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