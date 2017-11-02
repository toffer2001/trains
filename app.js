  var config = {
    apiKey: "AIzaSyBalCcAyjT0gUNjdLB0g4J5GKU6Z4UAESs",
    authDomain: "hw7-trains-2ea0b.firebaseapp.com",
    databaseURL: "https://hw7-trains-2ea0b.firebaseio.com",
    projectId: "hw7-trains-2ea0b",
    storageBucket: "hw7-trains-2ea0b.appspot.com",
    messagingSenderId: "96227412083"
  };




  firebase.initializeApp(config);

var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = 0;

$("#submit-bid").on("click", function(event) {
	  // Prevent form from submitting
	  event.preventDefault();

	  // Get the input values

	  trainName = $("#train-name").val().trim();
	  destination = $("#train-destination").val().trim();
	  firstTime = $("#train-first-time").val().trim();
	  frequency = parseInt($("#train-frequency").val().trim());

 	database.ref("/trains").push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    });



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    var arrivalTime = moment(nextTrain).format("HH:mm");

    // var new_row = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>";
    // $("#tableBody").append(new_row);



});


    // Firebase watcher + initial loader
    database.ref("/trains").on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().trainName);
      // console.log(childSnapshot.val().destination);
      // console.log(childSnapshot.val().firstTime);
      // console.log(childSnapshot.val().frequency);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(childSnapshot.val().firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequency;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    var arrivalTime = moment(nextTrain).format("HH:mm");




      var previousData = "<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>";
      // console.log(previousData);
      $("#tableBody").append(previousData);



    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



// database.ref("/trains").on("child_added", function(childSnapshot) {
//  var previousData = "<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().arrivalTime + "</td><td>" + childSnapshot.val().tMinutesTillTrain + "</td></tr>";
//     console.log(previousData);
//     $("#tableBody").append(previousData);
// });