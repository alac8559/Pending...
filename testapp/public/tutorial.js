var began=false;
var text = "Welcome";

$(document).ready(function() {
  var target = document.getElementById('tutorial-start');
  document.getElementById('tutorial-start-header').innerHTML+='<div id="code">'+l2c(text)+'</div>';
});


function runTutorial() {
  if (began) {
    alert("Tutorial already in progress");
  } else {
    began = true;
    c2a(text);
    document.getElementById('tut-1').innerHTML="Now enter the translated code into the box below!";
    var target = document.getElementById('tut-target');
    var input = "<input type='text' style='margin-left:auto;margin-right:auto;width:300px' class='form-control'" +
               "id='tut-inp'><br>" +
               "<input type='button' onclick='checkInput()' value='Submit'>";
    target.innerHTML += input;


    document.getElementById('content').innerHTML += "<br><p style='font-size:8pt;text-align:center'>Hint: the answer is:<br>" +
                        text + "</p>";
  }
}

function runResults(iWrong) {
  if (began) {
    var target = document.getElementById('tut-target');
    var oldValue = document.getElementById('tut-inp').value.toUpperCase();
    var accuracy, accText
    if (iWrong.length <= 0) {
        accuracy = 1
        accText = "100%"
    } else if (iWrong.length >= text.length) {
      accText = "0%"
    } else {
      accuracy = (1 - (iWrong.length / this.text.length)).toString()
      accText = accuracy.substring(2,4) + "." + accuracy.substring(5,7) + "%"
    }
    while (oldValue.length < text.length) {
      oldValue += " ";
    }

    target.innerHTML = "<div class='container' style='width:800px'>" +
    											"<table class='table table-bordered' style='margin-right:auto;margin-left:auto'>" +
                          "<tr><td style='width:150px'>Correct Solution:</td>" +
    														"<td style='width:650px'><span id='tut-sol'></span></td></tr>" +
    													"<tr><td>Your Solution:</td><td><span id='tut-inp'></span></td></tr>" +
    													"<tr><td>Accuracy:</td><td><span id='tut-acc'></span></td>" +
                          "</table></div>";
    document.getElementById('tut-sol').innerHTML = this.text.toUpperCase();

    var inpSol="";
    if (iWrong.length > 0) {
      j = 0
      for (i = 0; i < oldValue.length; i++) {
        if (i == iWrong[j]) {
          console.log("RED")
          if (oldValue.substring(i,i+1) != " ") {
            inpSol += "<span style='color:#8B0000'>" + oldValue.substring(i,i+1) + "</span>";
          } else {
            inpSol += "<span style='color:#8B0000'>_</span>"
          }
          j++;
        } else {
          inpSol += oldValue.substring(i,i+1);
        }
        if (i > text.length) {
          inpSol += "<span style='color:#8B0000'>" + oldValue.substring(i,i+1) + "</span>"
        }
      }
    } else {
      inpSol = oldValue;
    }

    document.getElementById('tut-inp').innerHTML = inpSol;
    document.getElementById('tut-acc').innerHTML = accText;

    target.innerHTML += "<p style='margin-left:auto;margin-right:auto'>Congratulations!  You've completed the tutorial!</p>"
    target.innerHTML += "<button type='button' onclick='window.location.reload()' value='Complete Tutorial'>Complete Tutorial</button>"

  }


}

function checkInput() {
  var input = document.getElementById('tut-inp').value.toUpperCase();
  test = this.text.toUpperCase();
  var iWrong = [];

  for (i = 0; i < text.length; i++) {
    if (input.substring(i, i+1) != test.substring(i, i+1)) {
      iWrong.push(i);
    }
  }

  runResults(iWrong);
  // return iWrong;  //returns an array of indexes for letters that were incorrect.
}