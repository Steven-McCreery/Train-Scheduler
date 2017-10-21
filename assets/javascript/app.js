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
		$("tbody").empty();
		event.preventDefault();
		var trainName = $("#name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var firstTrainTime = $("#ftt-input").val().trim();
		var frequency = $("#frequency-input").val().trim();

		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		// clear input sections back to placeholder
		$("input").val("");

		// child added update function
		database.ref().on("child_added", function(childSnapshot) {
			// console.log(JSON.parse(childSnapshot));
			console.log(childSnapshot.val().trainName);
			console.log(childSnapshot.val().destination);
			console.log(childSnapshot.val().firstTrainTime);
			console.log(childSnapshot.val().frequency);
		},function(errorObject) {
			// console.log(errorObject.code);
		});


		// ordering display area
		database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(snapshot) {
			$("tbody").prepend(
					"<tr><td>" + snapshot.val().trainName + "</td><td>" + 
					snapshot.val().destination + "</td><td>" + 
					"snapshot.val().firstTrainTime" + "</td><td>" + 
					snapshot.val().frequency + "</td><td>" + 
					"snapshot.val().firstTrainTime" + "</td></tr>"
				)
			// console.log(JSON.parse(snapshot));
		})
	})


	






})

