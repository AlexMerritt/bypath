'use strict';
angular.module('main')
.controller('MappyCtrl', function ($rootScope, $log, Geolocation) {

  // Note that 'mappyCtrl' is also established in the routing in main.js.
  var mappyCtrl = this;
  mappyCtrl.thing = {};

  // Getting the threeoneones resolved in the main abstract controller.
  mappyCtrl.threeOneOneMarkers = $rootScope.threeoneones;

  // Defaults.
  mappyCtrl.zoom = 12;
  mappyCtrl.boston = { // This object is formatted to imitate the coords object from the geolocator.
    coords: {
      latitude: 42.4,
      longitude: -71.1
    }
  };

  var initializeMap = function (position, markers) {
    //\\
    // $log.log('initializeMap position -> ', position);

    // Create the Google Map
    mappyCtrl.map = {
      center: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      zoom: mappyCtrl.zoom,
      // control: {},
      // styles: mappyStyle,
      // markers: get311Markers(),
      options: {scrollwheel: false},
      disableDefaultUI: false,
      markersEvents: {
         click: function(marker, eventName, model) {
           console.log('Click marker');
           mappyCtrl.map.infoIcon = model.icon;
           mappyCtrl.map.infoDescription = model.description;
           mappyCtrl.map.infoAddress = model.address;
         }
       }
    };
  };

  var getLocation = function () {
    Geolocation.get()
      .then(function (position) { // Success.
        // return position
        initializeMap(position);
      },
      function (err) { // Error. Possibly/probably because it wasn't allowed.
        $log.log("Shit! (Maybe geolocation wasn't allowed?).\nError: ", err);

        // so we'll use Boston instead of current loc
        initializeMap(mappyCtrl.boston);
      });
  };
  getLocation();

  // var get311Markers = function () {
  //   ThreeOneOne.get311(complainables.GRIPES)
  //     .then(function got311 (markers) {
  //       $log.log(markers);

  //       // mappyCtrl.threeOneOneMarkers = markers;

  //       // This will check for availability of current location and then initialize the map with either the current loc or with default Boston.
  //       getLocation();
  //       // return markers;
  //     }, function failedGetting311 (err) {
  //       $log.log("Errrrrororrrr...", err);
  //     });
  // };

  // get311Markers();

});