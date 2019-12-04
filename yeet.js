const mysql = require("mysql");
const express = require("express");
const fs = require("fs");

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
		
		var sql = "SELECT * FROM customers";
		conn.query(sql, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log(fields);
			fs.readFile("header.html", (err, htmlhead)=>{
				if (err) throw err;
				res.writeHead(200, { "Content-Type":"text/html" });
				res.write(htmlhead);
				
				//write data inside a table
				res.write("<table border='1'>");
				for (customer of result)
				{
					res.write("<tr>");
					res.write("<td>" + customer.CustomerId + "</td>"
						+ "<td>" + customer.CustFirstName + "</td>"
						+ "<td>" + customer.CustLastName + "</td>"
						+ "<td>" + customer.CustAddress + "</td>"
						+ "<td>" + customer.CustCity + "</td>"
						+ "<td>" + customer.CustProv + "</td>"
						+ "<td>" + customer.CustPostal + "</td>"
						+ "<td>" + customer.CustCountry + "</td>"
						+ "<td>" + customer.CustHomePhone + "</td>"
						+ "<td>" + customer.CustBusPhone + "</td>"
						+ "<td>" + customer.CustEmail + "</td>"
						+ "<td>" + customer.AgentId + "</td>");
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