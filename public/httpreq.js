
// from W3Schools, then very edited

// TODO: make sure this new structure works
// how to use: have the value to send to the page in a text field with the ID "Get[fieldname]"
//             have places in the page with IDs "Got[fieldname] for the returned data to go to"
//             Node script returns a JSON object

async function requestUserCount(checkName){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            return parseInt(xhttp.responseText); 
        }
    }
    xhttp.open("POST", "/checkUsername", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("CustUsername=" + document.getElementById(checkName).value);
}