function confirmPress(action){
    var isOK = window.confirm("Are you sure you're ready to " + action + " this form?");
    if(isOK && action=='submit'){
        // when they want to submit the form, run various validation checks that HTML can't do
        // if any validation problems, warn the user and make isOK false so form is not submitted
        var messages =""
        
        // make sure the passwords match
        validation1 = document.getElementById('CustPassword').value;
        validation2 = document.getElementById('CustPassword2').value;
        if(validation1 != validation2) {
            messages += "The passwords do not match, please enter your password again\n";
        }
        
        // display messages if there are any, and cancel form submission
        if (messages != ""){
            isOK = false;
            window.alert(messages);            
        }
    }
    return isOK;
}

function checkUsername(){
    requestUserCount("CustUsername").then((c)=>{
        if (c>0){
            window.alert("That username is already in use. Please choose a new username");
            document.getElementById('CustUsername').value = "";
        }
    });
}