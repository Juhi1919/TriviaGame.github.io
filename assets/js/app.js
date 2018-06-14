$(document).ready(function () {
var options = [
	{
		question: "Mark Zuckerberg was one of the founders of which social networking site?", 
		choice: ["Twitter", "Facebook", "Insagram", "SanpChat"],
		answer: 1,
		photo: "assets/images/facebook.png"
	 },
	 {
	 	question: "When talking about computer memory, what does the ROM stand for?", 
		choice: ["Read-Access memory", "Read-object memory", "Read-only memory", "None"],
		answer: 2,
		photo: "assets/images/rom.jpg"
	 }, 
	 {
	 	question: "Which of the following is a storage device?", 
		choice: ["Hard Disk", "USB Disk", "Floppy Disk", "All of the above" ],
		answer: 3,
		photo: "assets/images/harddisk.jpg"
	}, 
	{
		question: "Collection of 1024 Bytes?", 
		choice: ["1MB", "1TB", "1GB", "1KB" ],
		answer: 2,
		photo: "assets/images/1gb.jpg"
	}, 
	{
		question: "Which of the following is a presentation program?", 
		choice: ["MS-Word", "MS-Access", "MS-Excel", "MS-Powerpoint" ],
		answer: 3,
		photo: "assets/images/ppt.jpg"
	}, 
	{
		question: "LAN Stands For?", 
		choice: ["Wide Area Network", "Local Area Network", "Wireless Network", "None" ],
		answer: 1,
		photo: "assets/images/lan.jpg"
	}, 
	{
		question: "A keyboard is an example of a ________device.", 
		choice: ["User", "Input", "Output", "None Of Above" ],
		answer: 1,
		photo: "assets/images/key.jpg"
	}, 
	{
		question: " Which mouse key most commonly use for opens items?", 
		choice: ["Right", "Middle", "None", "Left" ],
		answer: 3,
		photo: "assets/images/mouse.jpg"
	}];

var correctAns = 0;
var wrongAns = 0;
var notAttend = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement,1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		notAttend++;
		stop();
		$("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#question").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoose = $("<div>");
			userChoose.addClass("answerchoice");
			userChoose.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoose.attr("data-guessvalue", i);
			$("#answer").append(userChoose);
//		}
}

//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctAns++;
		userGuess="";
		$("#answer").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongAns++;
		userGuess="";
		$("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answer").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answer").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((correctAns + wrongAns + notAttend) === qCount) {
		$("#question").empty();
		$("#question").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answer").append("<h4> Correct: " + correctAns + "</h4>" );
		$("#answer").append("<h4> Incorrect: " + wrongAns + "</h4>" );
		$("#answer").append("<h4> Not Attemp: " + notAttend + "</h4>" );
		$("#reset").show();
		correctAns = 0;
		wrongAns = 0;
		notAttend = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answer").empty();
	$("#question").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})