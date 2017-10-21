$(document).ready(function() {

	// display modal function
	var selectViewModal = function() {
		$("#viewSelect").modal("show");
	}

	// call show modal on load
	selectViewModal();

	// click function to change display on modal decision
	$("a").on("click", function() {
		$("li").removeClass("active");
		$(this).parent().addClass("active");
		$("#viewSelect").modal("hide");
		if ($("#review").closest("li").hasClass("active")) {
			if (!$("#adminEntry").hasClass("hidden")) {
				$("#adminEntry").addClass("hidden");
			}
			$("#schedule").removeClass("col-xs-8");
			$("#schedule").addClass("col-xs-12");
		}else{
			$("#adminEntry").removeClass("hidden");
			$("#schedule").addClass("col-xs-8");
			$("#schedule").removeClass("col-xs-12");
		}
		$("#schedule").removeClass("hidden");
	})

	// change display mode
	$("#viewChange").on("click", function() {
		selectViewModal();
	})

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAbQ_rcwZtFqJvo7Pzk-3XbkJXQlp03rHQ",
		authDomain: "coding-bootcamp-week-7.firebaseapp.com",
		databaseURL: "https://coding-bootcamp-week-7.firebaseio.com",
		projectId: "coding-bootcamp-week-7",
		storageBucket: "coding-bootcamp-week-7.appspot.com",
		messagingSenderId: "89038699307"
		};
	firebase.initializeApp(config);

	// define database
	var database = firebase.database();

	// push to firebase and prevent submit's default reload
	$("#add-train").on("click", function(event) {
		event.preventDefault();
		var trainName = $("#name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var firstTrainTime = $("#ftt-input").val().trim();
		var frequency = $("#frequency-input").val().trim();

		// add new inputs to firebase
		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		// clear input sections and table, then redraw table
		$("input").val("");
		$("tbody").empty();
		runtime();
	})

	// ordering display area
	var runtime = function() {
		database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
		var timeNow = moment().format("HHmm");
		var yesterDay = moment(snapshot.val().firstTrainTime, "HHmm").subtract(1,"Day");
		var timeDiff = moment(yesterDay, "minutes").diff(timeNow, "minutes");
		var remainder = timeDiff % snapshot.val().frequency;
		var nextTrainWait = snapshot.val().frequency - remainder;
		var nextTrainArrive = moment().add(nextTrainWait, "minutes").format("HHmm");
		$("tbody").prepend(
			"<tr><td>" + snapshot.val().trainName + "</td><td>" + 
			snapshot.val().destination + "</td><td>" + 
			snapshot.val().frequency + "</td><td>" + 
			nextTrainArrive + "</td><td>" + 
			nextTrainWait + "</td></tr>"
		)
	})} 
	runtime();

})

