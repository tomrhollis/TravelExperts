const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("views", { "extensions": ["html"] }));
app.use(express.static("media"));

app.listen(8000, err=>{
	if (err) throw err;
	console.log("server started");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/post_form", (req, res)=>{
	console.log(req.body);
	/*var search = req.body.searchString;
	res.end("Data received: search=" + search);*/
	res.redirect("/vacationPackages");
});

app.use((req, res, next)=>{
	res.status(404).send("ERROR 404 FILE NOT FOUND!");
});

