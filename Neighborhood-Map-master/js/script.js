var map;
var markersArray = [];
var bounds;
var infowindow;


//Initialize the map and its contents
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(33.6056711,-112.4052494)
    };


    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow();

    locationMarkers(markers);
    window.onresize = function() {
      map.fitBounds(bounds);
    }
}

//Array of sightseeing locations in Phoenix
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
    title: "Phoenix Zoo",
    lat: 33.4510486,
    lng: -111.950212,
    streetAddress: "455 N Galvin Pkwy",
    cityAddress: "Phoenix, AZ 85008",
    url: "http://phoenixzoo.org/",
    id: "nav4",
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
    id: "nav5",
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
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    }
];

//google streetview url
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';
document.getElementById('zoom-to-area').addEventListener('click', function() {
          zoomToArea();
});

function zoomToArea() {
       // Initialize the geocoder.
       var geocoder = new google.maps.Geocoder();
       // Get the address or place that the user entered.
       var address = document.getElementById('zoom-to-area-text').value;
       // Make sure the address isn't blank.
       if (address == '') {
         window.alert('You must enter an area, or address.');
       } else {
         // Geocode the address/area entered to get the center. Then, center the map
         // on it and zoom in
         geocoder.geocode(
           { address: address,
             componentRestrictions: {locality: 'Phoenix'}
           }, function(results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
               map.setCenter(results[0].geometry.location);
               map.setZoom(15);
             } else {
               window.alert('We could not find that location - try entering a more' +
                   ' specific place.');
             }
           });
       }
     }


//location is assigned to markers by looping through the array
//image or icon for marker is assigned
function locationMarkers(location) {

    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          animation : google.maps.Animation.DROP,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)

            }


        });

        bounds.extend(location[i].holdMarker.position);





        //Binds infoWindow content to each marker

       location[i].contentString =location[i].title +
                                  location[i].title + '</strong><br><p>' +
                                  location[i].streetAddress + '<br>' +
                                  location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url +
                                  '" target="_blank">' + location[i].url + '</a>';

        //triggers infowindow upon click



      viewModel.showInfo = function(location){
        google.maps.event.trigger(location.holdMarker,'click');

      }


        //opens infowindow when link or marker is clicked
         location[i].holdMarker.addListener ( 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.open(map,marker);
            map.setZoom(16);
            //map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          };
        })(location[i].holdMarker, i));
    }
}



//use of knockout to display search result in nav bar
var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.computed(function() {
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
