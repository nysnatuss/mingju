// Variables
var data_arr = []; // All list of mingju
// Selected
var x1; // Which form
var x2; // Which line
var selmj = []; // Selection of which mingju, 1 = selected
// Question and anwser
var question;
var answer;
// Settings
var limit;
var wrongLimit = 2; // 0 = no limit
// Current settings
var currQuestion;
var currWrong = 0;

/* TODO var */
var customMJ;
var timeout = 60; // in seconds
var ansSide = [1,1];
/* End TODO */

// Document ready
$(document).ready(function() {
	dataHandling();
});

// Convenient
function mjLoop(x) {
	var a;
	switch (x) {
		case 0:
			return 'z0';
			break;
		case 1:
			return 'z1';
			break;
		case 2:
			return 'z2';
			break;
		case 3:
			return 'z3';
			break;
		case 4:
			return 'z4';
			break;
		case 5:
			return 'z5';
			break;
		default:
			alert("Error caught! (mjl1)\nPlease report to the website administrator with reproduce steps.");
			return '';
			break;
	}
}

// Setup
function firstsetup() {
	// Check for errors in input
	var selectAll = 0;
	for (var x=0; x<=5; x++) {
		if ($('#' + mjLoop(x)).is(":checked")) {
			// If selectAll < 1, that means there are one is selected
			selectAll = selectAll + 1;
			selmj[x] = 1;
		} else {
			selmj[x] = 0;
		}
	}
	if (selectAll < 1) {
		alert("您没有选择你所要测验的名句！");
	} else if (parseInt($("#mjNum").val()) < 1 ||
			   parseInt($("#mjNum").val()) > 1000) {
		alert("请您选择正确的测验次数！");
	} else {
		limit = parseInt($("#mjNum").val());
		$("#intro").css("display", "none"); //Debug
		$("#qDisplay").css("display", "block");
		currQuestion = 0;
		randomize();
	}
}

// Randomize a question
function randomize() {
	if (currQuestion < limit) {
		$("input[type=text], textarea").val(""); // Clear form
		currQuestion = currQuestion + 1;
		do {
			x1 = Math.floor(Math.random() * data_arr.length);
		} while (selmj[x1] === 0);
		x2 = Math.floor(Math.random() * data_arr[x1].length);
		question = data_arr[x1][x2].replace(/ *\[[^\]]*]/, ''); // rm anything in []
		answer = data_arr[x1][x2].match(/\[(.*?)\]/)[1].replace(/[，。；？！,.;?!]/g, ''); // rm anything other than [] and rm its symbol
		if (question.startsWith("，") || question.startsWith("；")) {
			$('#after').text(question);
			$('#before').text("");
		} else {
			$('#before').text(question);
			$('#after').text("");
		}
		$('#count').text(currQuestion);
		switch (x1) {
			case 0:
				$('#level').text("预备班");
				break;
			case 1:
				$('#level').text("中一");
				break;
			case 2:
				$('#level').text("中二");
				break;
			case 3:
				$('#level').text("中三");
				break;
			case 4:
				$('#level').text("中四");
				break;
			case 5:
				$('#level').text("中五");
				break;
		}
		console.log(x1 + "," + x2 + "," + answer); //Debug
	} else {
		alert("Done!");
		$("#qDisplay").css("display", "none");
		$("#intro").css("display", "block");
	}
}

// Check the answer
function check() {
	var userAns = $("#input1").val();
	userAns = userAns.replace(/[，。；？！,.;?! ]/g, '');
	if ($("#input1").val() === "" ||
		$("#input1").val() === undefined) {
		alert("您没有输入任何字母！");
	} else if (userAns == answer) {
		alert("Correct");
		randomize();
	} else if (currWrong < wrongLimit || wrongLimit === 0) {
		if (wrongLimit !== 0) currWrong = currWrong + 1;
		alert("Wrong");
	} else {
		alert("What?");
	}
}

// Data handling
function dataHandling() {
	for (var x=0;x<=5;x++) {
		var txtFile = 'list/z' + x + '.txt';
		$.get(txtFile, function(data) {
			var lines = data.split('\n');
			data_arr.push(lines);
		}, 'text');
	}
}