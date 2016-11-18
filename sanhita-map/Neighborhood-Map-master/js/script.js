var map;
var markersArray = [];
var bounds;


//Initialize the map and its contents
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(33.6056711,-112.4052494),
        mapTypeControl: false,
        disableDefaultUI: true
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 9;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNav();
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    bounds = new google.maps.LatLngBounds();

    setMarkers(markers);
    map.fitBounds(bounds);


    //Reset map on click handler and
    //when window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(9);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(10);
            map.setCenter(mapOptions.center);
        }
    }
}

//Information about the different locations
//Provides information for the markers
var markers = [
    {
    title: "Lake Pleasant Regional Park",
    lat: 33.6056711,
    lng: -112.4052494,
    streetAddress: "41835 N Castle Hot Springs Rd",
    cityAddress: "Morristown, AZ 85342",
    url: "http://www.maricopacountyparks.net/park-locator/lake-pleasant-regional-park/",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Musical Instruments Museum",
    lat: 33.6675751,
    lng: -111.9804561,
    streetAddress: "4725 E Mayo Blvd",
    cityAddress: "Phoenix, AZ 85050",
    url: "http://mim.org/",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Papago Park",
    lat: 33.4538465,
    lng: -111.9555982,
    streetAddress: "625 N Galvin Pkwy",
    cityAddress: "Phoenix, AZ 85008",
    url: "https://www.phoenix.gov/parks/trails/locations/papago-park",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Desert Botanical Garden",
    lat: 33.462046,
    lng: -111.94723,
    streetAddress: "1201 N Galvin Pkwy",
    cityAddress: "Phoenix, AZ 85008",
    url: "http://www.dbg.org/",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Fashion Square Mall",
    lat: 33.5029868,
    lng: -111.9312346,
    streetAddress: "7014 E Camelback Rd",
    cityAddress: "Scottsdale, AZ 85251",
    url: "http://www.fashionsquare.com/?utm_source=google&utm_medium=onlinesearch&utm_content=gmp_website_button&utm_campaign=yext",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Phoenix Zoo",
    lat: 33.4510486,
    lng: -111.950212,
    streetAddress: "455 N Galvin Pkwy",
    cityAddress: "Phoenix, AZ 85008",
    url: "http://phoenixzoo.org/",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Rosson House",
    lat: 33.4502033,
    lng: -112.0681136,
    streetAddress: "113 N 6th St",
    cityAddress: "Phoenix, AZ 85004",
    url: "http://heritagesquarephx.org/",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Arizona Science Center",
    lat: 33.4487237,
    lng: -112.0687169,
    streetAddress: "600 E Washington St",
    cityAddress: "Phoenix, AZ 85004",
    url: "http://www.azscience.org/",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    }
];

//Get Google Street View Image for each inidividual marker
    //Passed lat and lng to get each image location
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function determineImage() {
    if (i === 3) {
        streetViewImage = streetViewUrl + '38.892052,-77.008888&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    } else if (i === 4) {
        streetViewImage = streetViewUrl +
                        markers[i].streetAddress + ',' + markers[i].cityAddress +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    } else {
       streetViewImage = streetViewUrl +
                        markers[i].lat + ',' + markers[i].lng +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
                    }
}

//Sets the markers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The markers are inidividually set using a for loop
function setMarkers(location) {

    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }
        });

        bounds.extend(location[i].holdMarker.position);



        //function to place google street view images within info windows
        determineImage();

        //Binds infoWindow content to each marker
        //location[i].contentString = '<img src="' + streetViewImage +
                                  //  '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' +
                                  //  location[i].title + '</strong><br><p>' +
                                  //  location[i].streetAddress + '<br>' +
                                  //  location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url +
                                  //  '" target="_blank">' + location[i].url + '</a>';

       location[i].contentString = '<img src="' + streetViewImage +
                                  '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' +
                                  location[i].title + '</strong><br><p>' +
                                  location[i].streetAddress + '<br>' +
                                  location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url +
                                  '" target="_blank">' + location[i].url + '</a>';

        //Click marker to view infoWindow
            //zoom in and center location on click


      var viewModel = {
            showInfo:  function(location){
              infowindow.setContent(location[i].contentString);
              infowindow.open(map,marker);
              map.setZoom(16);
              map.setCenter(marker.getPosition());
              google.maps.event.trigger(location.marker,'click');
         },
           // more code below
      };

        //Click nav element to view infoWindow
            //zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          };
        })(location[i].holdMarker, i));
    }
}

//Query through the different locations from nav bar with knockout.js
    //only display markers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    var newArray = ko.utils.arrayFilter(markers, function(marker) {
        if (marker.title.toLowerCase().indexOf(search) >= 0) {
            if (typeof marker.holdMarker === 'object') {
                marker.holdMarker.setVisible(true);
            }
            return true;
        } else {
            if (typeof marker.holdMarker === 'object') {
                marker.holdMarker.setVisible(false);
            }
            return false;
        }
    });
    return newArray;
}, viewModel);

ko.applyBindings(viewModel);
