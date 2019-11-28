function confirmPress(action){
    var isOK = window.confirm("Are you sure you're ready to " + action + " this form?");
    if(isOK && action=='submit'){
        // when they want to submit the form, run various validation checks that HTML can't do
        // if any validation problems, warn the user and make isOK false so form is not submitted
        var messages =""
        
        // make sure there's either a first or last name
        var validation1 = document.getElementById('fname').value;
        var	validation2 = document.getElementById('lname').value;
        if((validation1 == null || validation1 == "") && (validation2 == null || validation2 == "")) {
            messages += "Please enter either a first name or a last name\n";
        }
        
        /* only use this if address is required
        // make sure they've selected a province
        validation1 = document.getElementById('prov').value;
        if(validation1 == ""){
            messages += "Please select a province\n";
        } */

        // make sure the passwords match
        validation1 = document.getElementById('pw1').value;
        validation2 = document.getElementById('pw2').value;
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