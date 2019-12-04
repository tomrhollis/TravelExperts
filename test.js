const mysql = require("mysql");
const express = require("express");
const fs = require("fs");

const app = express();

var conn = mysql.createConnection({
  host: "localhost",
  user: "Muhammad",
  // password: "",
  database: "travelexperts"
});

app.listen(8000, err => {
  if (err) throw err;
  console.log("server started");
});

app.use(express.static("./"));
app.get("/packagedata", (req, res) => {
  var data1;
  conn.query("SELECT * FROM packages", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/get-all", (req, res) => {
  console.log(req.body);

  conn.connect(err => {
    if (err) throw err;

    var sql = "SELECT * FROM packages";
    conn.query(sql, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      console.log(fields);
      fs.readFile("vacationPackagesUPDATED.html", (err, htmlhead) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(htmlhead);

        //write data inside a table
        res.write("<table border='1'>");
        for (packages of result) {
          res.write("<tr>");
          res.write(
            "<td>" +
              packages.PackageId +
              "</td>" +
              "<td>" +
              packages.PkgName +
              "</td>" +
              "<td>" +
              packages.PkgStartDate +
              "</td>" +
              "<td>" +
              packages.PkgEndDate +
              "</td>" +
              "<td>" +
              packages.PkgDesc +
              "</td>" +
              "<td>" +
              packages.PkgBasePrice +
              "</td>" +
              "<td>" +
              packages.PkgAgencyCommission +
              "</td>"
          );
          res.write("</tr>");
        }
        // res.write("</table>");

        // // fs.readFile("footer.html", (err, footer) => {
        // //   if (err) throw err;
        // //   res.write(footer);
        // //   res.end();
        // // });
      });
      conn.end(err => {
        if (err) throw err;
      });
    });
  });
});
