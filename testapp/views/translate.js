function translateMe(){
  document.title = "Registration";
  document.getElementById("titleH1").innerHTML = "Create Account";
  document.getElementById("fullNameTrans").innerHTML = "Full Name";
  document.getElementById("fullName").placeholder = "Enter Name";
  document.getElementById("emailTrans").innerHTML = "Email Address";
  document.getElementById("emailAddress").placeholder = "Enter Email";
  document.getElementById("passTrans").innerHTML = "Password";
  document.getElementById("submitTrans").innerHTML = "Already have an account? ";
  document.getElementById("signTrans").innerHTML = "Submit";
  document.getElementById("hyperLinkTrans").innerHTML = "Login here";
  alert("Soon enough you will understand what that gibberish was with the help of BeepBoop!");
  $("#transButton").remove();
}
