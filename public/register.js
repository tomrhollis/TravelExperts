/*
	Travel Experts: The Website
	Registration scripts (mostly the same as the login scripts)
	
	Group: Ivan, Muhammad, Steven, Tom
    Primary Page Author: Tom
*/

function requestUserCount(checkName){
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkUsername", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("CustUsername=" + document.getElementById(checkName).value);
    return xhttp.responseText; 
}

function confirmPress(action){
    var isOK = window.confirm("Are you sure you're ready to " + action + " this form?");
    
    if(isOK && action=='submit'){
        // when they want to submit the form, run various validation checks that HTML can't do
        // if any validation problems, warn the user and make isOK false so form is not submitted
        
        var messages ="";
        
        var validation1 = requestUserCount("CustUsername");

        if (validation1 > 0){
            document.getElementById('CustUsername').value = ""; 
            messages += "That username is already in use. Please choose a new username\n";
        }

        // make sure the passwords match
        validation1 = document.getElementById('CustPassword').value;
        var validation2 = document.getElementById('CustPassword2').value;
        if(validation1 != validation2) {
            messages += "The passwords do not match, please enter your password again\n";
        }
        
        // display messages if there are any, and cancel form submission
        if (messages != ""){
            window.alert(messages); 
            isOK = false;           
        } 
    }
    return isOK;
}
