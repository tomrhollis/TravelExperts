$(document).ready(function() {
    var navBar = 
    '<div id="header">\
      <h1 style="color:rgb(255, 255, 255);text-align:center;">\
        <a><img\
            src="media/logo1.png"\
            title="our head office"\
            alt="Travel Agency Logo"\
            width="70"\
            height="70"\
        /></a>\
        Travel Experts\
      </h1>\
    </div>\
\
    <div class="topnav"> \
      <nav>\
        <a href="vacationPackagesUPDATED.html">Home</a>\
        <a href="contactsUPDATED.html">Contact Us</a>\
        <a href="register.html">Create an Account</a>\
        <a href="vacationPackages.html">Vacation Packages</a>\
        <a href="http://hotels.com">Hotels</a> <br /><br />\
      </nav>\
    </div>';

   
    $("section").append(navBar);
});