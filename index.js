const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const mysql = require("mysql");
const sequelize = require('sequelize');
const db = new sequelize('travelexperts', 'admin', 'password', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: sendToLog, // use the logging function below instead of console.log
    define: {
        timestamps: false // stops sequelize from trying to insert its own fields into the DB
    }
});
const customers = require('./models/customers').model(db);
var conn = mysql.createConnection({ // Author
    host: "localhost",
    user: "admin",
    password: "password",
    database: "travelexperts"
  });

var port = 8000;

function sendToLog(message) {
	var todaysDate = moment().format("YYYY-MM-DD | HH:mm:ss.SSS");
	console.log("[" + todaysDate + "] " + message);
}
var usernames ="";

db.sync().then(()=> { // with guidance from https://medium.com/@paigen11/sequelize-the-orm-for-sql-databases-with-nodejs-daa7c6d5aca3
    sendToLog('DB sync successful');
    customers.findAll({ attributes: [[db.fn('DISTINCT', db.col('CustUsername')), 'CustUsername']] }).then((custs)=>{ //update the list
        usernames = custs.map(value => value.CustUsername);
    }); 
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

app.get('/', (req, res) => { // Authors: 
    conn.query("SELECT * FROM packages", (err, result) => {
        if (err) throw err;
        sendToLog(JSON.stringify(result));
        res.render('vacationPackagesUPDATED', {data: result});
      });
});
app.get('/index.html', (req, res) => {
    res.redirect('/');
});
app.get('/register.html', (req, res) => {
    res.render("register", {});
});
app.get('/contacts.html', (req, res) => {
    var agencies = "Select AgencyId, AgncyAddress, AgncyCity, AgncyProv, AgncyPostal, AgncyPhone FROM agencies ORDER BY AgencyId ASC";
    var agents = "Select AgtFirstName, AgtLastName, AgtBusPhone, AgtEmail, AgtPosition, AgencyId FROM agents ORDER BY AgencyId ASC";
    var pageData = "{";

    conn.query(agencies, (err, result1, fields1, rows2)=>{
        if (err) {
        console.log(err);
        }
        else {

            conn.query(agents, (err, result2, fields2, rows2)=>{
                if (err) {
                console.log(err);
                }
                else {
                    //console.log(result1);
                    console.log(result2);
                   res.render('contacts', {data1: result1, data2: result2});   
            
                }
            });
        } 
    });
});
app.get('/contactsUPDATED.html', (req, res) => {
    res.redirect("/contacts.html");
});
app.get('/vacationpackages.html', (req, res) => {
    res.redirect("/");
});
app.get('/vacationpackagesUPDATED.html', (req, res) => {
    res.redirect("/");
});

//BEGIN FORM PROCESSING SECTION
app.use(express.urlencoded({extended: true}));
app.post("/regform", (req, res) => {
    customers.create(req.body).then(function (customer) { // with help from https://stackoverflow.com/questions/52161821/insert-a-new-record-in-nodejs-using-sequelize-post-method/52162653
        if (customer) { // if successful, send back to the main page for now
            res.redirect("/");
            customers.findAll({ attributes: [[db.fn('DISTINCT', db.col('CustUsername')), 'CustUsername']] }).then((custs)=>{ //update the list
                usernames = custs.map(value => value.CustUsername);
            }); 
        } else {
            res.status(400).send('<!DOCTYPE html><html lang="en"><body><h1>400: Database Error</h1></body></html>');
        }
   });
});


app.post('/checkUsername', (req, res) => {
    var c = 0;
    if (usernames.includes(req.body.CustUsername)){
        c = 1;
    }
    res.status(200).send("" + c);
    sendToLog("" + c);
});

app.get("/packagedata", (req, res) => {
    
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