const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require('path');


app.use(express.static("views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "travelexperts"
});

conn.connect();

    app.get('/contacts', (req, res)=>{
    res.render('contacts', {Agency1: {Agencyid: 1}, Agency2: {Agencyid: 2}, Address1: {AgncyAddress: "1155 8th Ave SW"}, 
    Address2: {AgncyAddress: "110 Main Street"}, Phone1: {AgncyPhone: 4032719873}, Phone2: {AgncyPhone: 4035632381}, AgtJanetF: {AgtFirstName: "Janet"}, AgtJanetL: {AgtLastName: "Delton"},
    AgtJanetP: {AgtBusPhone: "403-210-7801"}, AgtJanetEM: {AgtEmail: "janet.delton@travelexperts.com"}, AgtJudyF: {AgtFirstName: "Judy"}, AgtJudyL: {AgtLastName: "Lisle"},
    AgtJudyP: {AgtBusPhone: 4032107802}, AgtJudyEM: {AgtEmail: "judy.lisle@travelexperts.com"}, AgtDennisF: {AgtFirstName: "Dennis"}, AgtDennisL: {AgtLastName: "Reynolds"},
    AgtDennisP: {AgtBusPhone: 4032107843}, AgtDennisEM: {AgtEmail: "dennis.reynolds@travelexperts.com"}, AgtJohnF: {AgtFirstName: "John"}, AgtJohnL: {AgtLastName: "Coville"},
    AgtJohnP: {AgtBusPhone: 4032107823}, AgtJohnEM: {AgtEmail: "john.coville@travelexperts.com"}, AgtFredF: {AgtFirstName: "Fred"}, AgtFredL: {AgtLastName: "Smith"},
    AgtFredP: {AgtBusPhone: 4032105555}, AgtFredEM: {AgtEmail: "fred.smith@travelexperts.com"}, AgtBruceF: {AgtFirstName: "Bruce"}, AgtBruceL: {AgtLastName: "Dixon"},
    AgtBruceP: {AgtBusPhone: 4032107867}, AgtBruceEM: {AgtEmail: "bruce.dixon@travelexperts.com"}, AgtBeverlyF: {AgtFirstName: "Beverly"}, AgtBeverlyL: {AgtLastName: "Jones"},
    AgtBeverlyP: {AgtBusPhone: 4032107812}, AgtBeverlyEM: {AgtEmail: "beverly.jones@travelexperts.com"}, AgtJaneF: {AgtFirstName: "Jane"}, AgtJaneL: {AgtLastName: "Merrill"},
    AgtJaneP: {AgtBusPhone: 4032107868}, AgtJaneEM: {AgtEmail: "jane.merrill@travelexperts.com"}, AgtBrianF: {AgtFirstName: "Brian"}, AgtBrianL: {AgtLastName: "Peterson"},
    AgtBrianP: {AgtBusPhone: 4032107833}, AgtBrianEM: {AgtEmail: "brian.peterson@travelexperts.com"}});
});
	var sql = "Select * FROM agencies, agents ";
	conn.query(sql, (err, result, fields, rows)=>{
		if (err) {
        console.log(err);
        }
        else {
            console.log(result);
               
                
            
        };    
    });

    

app.listen(8000, err=>{
	
	if (err) throw err;
    console.log("server started")
});



