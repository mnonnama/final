


var styles = [{
	stylers: [
	{hue: '#00ffe6'},
	{saturation: -20}]
},{
	featureType: 'road',
	elementType: 'geometry',
	stylers:[
	{lightness: 100},
	{visibility: 'simplified'}]
},{
	featureType:'road',
	elementType: 'labels',
	stylers: [{visibility: 'off'}]
}];


function initMap(){

 var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false,
    styles: styles
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}



  $( function() {
    $( "#datepicker" ).datepicker();
  } );


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtj1XIsVcuhh6FvBOgSHaCObY44l0bdfM",
    authDomain: "final-project-b3146.firebaseapp.com",
    databaseURL: "https://final-project-b3146.firebaseio.com",
    projectId: "final-project-b3146",
    storageBucket: "final-project-b3146.appspot.com",
    messagingSenderId: "39857323637"
  };
  firebase.initializeApp(config);



var database = firebase.database();

  var reservationData = {};

$('.reservation-form').on('submit', function(event){
	event.preventDefault();
	reservationData.name = $('.reservation-name').val();
	reservationData.date = $('#datepicker').val();
  	var reservationsReference = database.ref('reservation');
  	reservationsReference.push(reservationData);
  	
});
  


function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservation').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservationslist').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {

      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        date: allReservations[reservation].date,
      };


      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservationslist').append(reservationListItem);

    }

  });

}
getReservations();



	initMap();