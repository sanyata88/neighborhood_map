var map;
var markersArray = [];
var bounds;
var infowindow;
var Client id = CED2ITPQPE5NTXDAHR0H2UOY55SU2JDWXRKEKR4JMQQRLZ4M
var Client secret = ZOIEHZM5WYB3EJ41MIN2XH5BFLP5LASOUXLCWDD3KKNZGASN



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

//google streetview url
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

$.getJSON('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&query=mcdonalds&client_id=2POUFAUU4ZBJ2MTDOY3S2YHR2NIT52FYW0LUTPHBMNTJFJNQ&client_secret=YFDZI1YWV3ZI5S5SPM2DZJEQIEBPIDJ5XFZBWTIKIQZVQNYM&v=20120101',
    function(data) {
        $.each(data.response.markers, function(i,marker){
            content = '<p>' + markers.title + '</p>';
            $(content).appendTo(location.contentString);
       });
});

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
            map.setCenter(marker.getPosition());
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
