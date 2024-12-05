let map, marker, directionsService, directionsRenderer;
function initMap() {
    const mapOptions = {
      zoom: 15,
      center: { lat: 43.651070, lng: -79.347015 }, // Toronto center
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: 'Clinic Location',
    });

    // Initialize Directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  }

function geocodeAddress(street, city) {
    const geocoder = new google.maps.Geocoder();

    // Combine the street and city into a full address string
    const fullAddress = `${street}, ${city}`;  // You can add more components (like state, zip) if needed

    // Call the geocode function with the full address
    geocoder.geocode({ address: fullAddress }, function (results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;

            // Set the map center to the geocoded location
            map.setCenter(location);

            // Move the marker to the new location
            marker.setPosition(location); // Update the marker position
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(userLocation);
            marker.setPosition(userLocation);
        }, function (error) {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function getRoute() {
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;

    // Geocode the clinic's address
    geocodeAddress(address, city);

    // Get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const request = {
                origin: userLocation,
                destination: { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() },
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                } else {
                    alert("Directions request failed due to " + status);
                }
            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
