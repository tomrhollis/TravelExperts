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

app.get("/vacationPackages.html", (req, res)=>{
	console.log(req.body);
	var conn = mysql.createConnection({
		host: "localhost",
		user: "steven",
		password: "password",
		database: "travelexperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "SELECT `PackageId`, `PkgName`, `PkgStartDate`, `PkgEndDate`, `PkgDesc`, `PkgBasePrice`, `PkgAgencyCommission` FROM `packages` WHERE "; //+ document.getElementByName("searchString");
		conn.query(sql, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log(fields);
			fs.readFile("vacationPackage.html", (err, htmlhead)=>{
				if (err) throw err;
				res.writeHead(200, { "Content-Type":"text/html" });
				res.write(htmlhead);
				
				//write data inside a table
				res.write("<table border='1'>");
				for (customer of result)
				{
					res.write("<tr>");
					res.write("<td>" + packages.PackageId + "</td>"
						+ "<td>" + packages.PkgName + "</td>"
						+ "<td>" + packages.PkgStartDate + "</td>"
						+ "<td>" + packages.PkgEndDate + "</td>"
						+ "<td>" + packages.PkgDesc + "</td>"
						+ "<td>" + packages.PkgBasePrice + "</td>"
						+ "<td>" + packages.PkgAgencyCommission + "</td>");
					res.write("</tr>");
				}
				res.write("</table>");

				fs.readFile("footer.html", (err, footer)=>{
					if (err) throw err;
					res.write(footer);
					res.end();
				});
			});
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
});