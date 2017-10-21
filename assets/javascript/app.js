$(document).ready(function() {

	var selectViewModal = function() {
		$("#viewSelect").modal("show");
	}

	selectViewModal();

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

	var database = firebase.database();

	$("#add-train").on("click", function(event) {
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

		database.ref().on("child_added", function(childSnapshot) {
			return;
		})

		database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(snapshot) {
			return;
		})
	})

	






})

