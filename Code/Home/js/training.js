var began = false;
var text = "";
var lessonOrder = new Array(36);
console.log(document.getElementById("practiceLength"));
var practiceLength = document.getElementById("practiceLength").value;
var currentLesson = document.getElementById("currentLesson").value;

lessonOrder[1]="K & M";
lessonOrder[2]="U";
lessonOrder[3]="R";
lessonOrder[4]="E";
lessonOrder[5]="S";
lessonOrder[6]="N";
lessonOrder[7]="A";
lessonOrder[8]="P";
lessonOrder[9]="T";
lessonOrder[10]="L";
lessonOrder[11]="W";
lessonOrder[12]="I";
lessonOrder[13]="J";
lessonOrder[14]="Z";
lessonOrder[15]="F";
lessonOrder[16]="O";
lessonOrder[17]="Y";
lessonOrder[18]="V";
lessonOrder[19]="G";
lessonOrder[20]="5";
lessonOrder[21]="Q";
lessonOrder[22]="9";
lessonOrder[23]="2";
lessonOrder[24]="H";
lessonOrder[25]="3";
lessonOrder[26]="8";
lessonOrder[27]="B";
lessonOrder[28]="4";
lessonOrder[29]="7";
lessonOrder[30]="C";
lessonOrder[31]="1";
lessonOrder[32]="D";
lessonOrder[33]="6";
lessonOrder[34]="0";
lessonOrder[35]="X";

function setPracticeLength(length){
    practiceLength = length.value;
    generateLessonString();
}

function setCurrentLesson(lesson){
    currentLesson = lesson.value;
}

function generateLessonString(){
    text = "";
    for(let i = 0; i < practiceLength; i++){
	var letter = Math.floor(Math.random() * currentLesson) + 1;
	if(letter == 1){
	    letter = Math.floor(Math.random() * 2);
	    if(letter == 0){
		text += "K";
	    }
	    else{
		text += "M";
	    }
	}
	else{
	    text += lessonOrder[letter];
	}
    }
}

function addLessonButtons(){
    if(!began){
	document.getElementById("train-title").innerHTML = "Lesson " + currentLesson + ": " + lessonOrder[currentLesson];
	if(currentLesson == 1){
	    document.getElementById("buttonContainer").insertAdjacentHTML("afterend", "</br><button type='button' class='btn btn-primary' style='margin:20px;text-align:center;' onclick='c2a(\"K\")'>K</button><button type='button' class='btn btn-primary' margin='margin:20px;text-align:center;' onclick='c2a(\"M\")'>M</button>");
	    runTutorialA();
	}
	else{
	    document.getElementById("buttonContainer").insertAdjacentHTML("afterend", "</br><button type='button' class='btn btn-primary' style='margin:20px;text-align:center;' onclick='c2a(" + lessonOrder[currentLesson] + ")'>" + lessonOrder[currentLesson] + "</button>");
	}
    }
}



function runTutorialA() {
    if (began) {
	alert("Lesson already in progress");
    } else {
	began = true;
	document.getElementById('train-target').innerHTML += "Press to hear the new characters.";
	var target = document.getElementById('train-target');
	var input = "<p>When ready, press play to begin this training session.</p><input type='button' onclick='c2a(text)' value='Play'><input type='text' style='margin-left:auto;margin-right:auto;width:300px' class='form-control'" +
            "id='les-inp'><br>"  +
            "<input type='button' onclick='checkInput()' value='Submit'>";
	target.insertAdjacentHTML("afterend", input);
	generateLessonString(practiceLength);
    }
}

function runTutorialB(iWrong) {
    if (began) {
	var target = document.getElementById('train-target');
	var oldValue = document.getElementById('les-inp').value.toUpperCase();
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
	
	//Here we need to update the user's current lesson value once we add that in, so that when we reload the page it goes to the next lesson.
	if(parseInt(accText) >= 90){
	    target.innerHTML += "<p style='margin-left:auto;margin-right:auto'>Congrats, you've completed this lesson!</p>"
	    target.innerHTML += "<button type='button' onclick='window.location.reload()' value='Complete Tutorial'>Next Lesson</button>"
	}
	else{
	    target.innerHTML += "<p style='margin-left:auto;margin-right:auto'>We recommend that you retry this lesson until you reach 90% or higher accuracy.</p>"
	    target.innerHTML += "<button type='button' onclick='window.location.reload()' value='Complete Tutorial'>Next Lesson</button>"
	}
	
    }
    

}

function colorUserSolution(oldValue, iWrong) {

    
    return inpSol
}

function checkInput() {
    var input = document.getElementById('les-inp').value.toUpperCase();
    test = this.text.toUpperCase();
  var iWrong = [];
    
    for (i = 0; i < text.length; i++) {
	if (input.substring(i, i+1) != test.substring(i, i+1)) {
	    iWrong.push(i);
	}
    }
    
    runTutorialB(iWrong);
    // return iWrong;  //returns an array of indexes for letters that were incorrect.
}
