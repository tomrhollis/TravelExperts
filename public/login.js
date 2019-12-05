/*
	Travel Experts: The Website
	Login script
	
	Group: Ivan, Muhammad, Steven, Tom
    Primary Page Author: Tom
*/

function requestUserCount(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkUsername", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("CustUsername=" + document.getElementById('CustUsername').value);
    return xhttp.responseText; 
}

function requestValidation(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkPassword", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("CustUsername=" + document.getElementById("CustUsername").value + "&CustPassword=" + document.getElementById("CustPassword").value);
    return xhttp.responseText; 
}

function checkData(){
    var validation = requestUserCount();

    if (validation == "0"){
        window.alert("That username does not exist. Please try again or register");
        return false;
    }

    validation = requestValidation();

    if (validation != "OK" ){
        window.alert("The username and password do not match, please try again");
        return false;
    }
    return true;
}
