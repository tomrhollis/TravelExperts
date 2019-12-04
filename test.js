const mysql = require("mysql");
const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const app = express();
app.listen(8000, err=>{
	if (err) throw err;
	console.log("server started");
});

app.get("/get-all", (req, res)=>{
	console.log(req.body);
	var conn = mysql.createConnection({
		host: "localhost",
		user: "steven",
		password: "password",
		database: "travelexperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "SELECT * FROM packages";
		conn.query(sql, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log(fields);
			fs.readFile("vacationPackagesUPDATED.html", (err, htmlhead)=>{
				if (err) throw err;
				res.writeHead(200, { "Content-Type":"text/html" });
				res.write(htmlhead);
				
				const dom = new JSDOM(htmlhead);
				var document = dom.window.document;
				
				//write data inside a table
				res.write("<table border='1'>");
				for (packages of result)
				{
				    var p = document.createElement('p'); var node = document.createTextNode('<h1>" + packages.PackageId + "</h1>'); p.appendChild(node); document.getElementById('packages').appendChild(p);
					
					res.write("<h1>" + packages.PackageId + "</h1>");
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