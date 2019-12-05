const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require('path');


//app.use(express.static("views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/views', express.static('views'));


var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "travelexperts"
});

conn.connect() 

//getting contacts from database

app.get('/contacts', (req, res)=>{

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
    

app.listen(8000, err=>{
	
	if (err) throw err;
    console.log("server started")
});



