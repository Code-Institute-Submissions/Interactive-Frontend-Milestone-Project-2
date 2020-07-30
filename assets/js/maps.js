
var map;
var infowindow;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.326242, lng: 17.8419694 },
    zoom: 12
  });

  const request = {
    query: "The royal Palace Stockholm",
    fields: ["name", "geometry"]
  };
   let service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}
function createMarker(place) {
  var infowindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", () => {
    
    infowindow.setContent(place.name);
      infowindow.open(map ,marker);
  });
}