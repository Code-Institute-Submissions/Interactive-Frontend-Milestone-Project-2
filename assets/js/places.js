let service;
let pyrmont;
let map;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let markers = [];
let placesList = [];

function initMap() {
  // Create the map.
  pyrmont = { lat: 59.32, lng: 18.06 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 15,
  });
  google.maps.event.addDomListener(window, "load", initMap);
  // Create the places service.
  service = new google.maps.places.PlacesService(map);

 searchPlaces("cafe");
  var choices = document.forms["choice"].elements["choice"];
  for (var i = 0, max = choices.length; i < max; i++) {
    choices[i].onclick = function () {
      searchPlaces(this.value);
    };
  }
}
// perform search
function searchPlaces(loctype) {
  service.nearbySearch(
    { location: pyrmont, radius: 3500, type: loctype },
    (results, status, pagination) => {
      if (status !== "OK") return;
          createMarkers(results, map);
    }
  );
}

function createMarkers(places, map) {

  if (placesList !== undefined || placesList.length !== 0) {
      placesList = [];
    }
  const bounds = new google.maps.LatLngBounds();

  clearMarkers();
  for (let i = 0, place; (place = places[i]); i++) {
    let marker = new google.maps.Marker({
      map,
       label: labels[labelIndex++ % labels.length],
      title: place.name,
      position: place.geometry.location,
    });
    markers.push(marker);
  
    placesList.push(place.name);
    bounds.extend(place.geometry.location);
  }
  placesList.forEach(function (item) {
    const li = document.createElement("li");
    var text = document.createTextNode(item);
    li.appendChild(text);
    document.getElementById("places").appendChild(li);
 });

  map.fitBounds(bounds);
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
  document.getElementById("places").innerHTML="";
}
/* scroll-text format*/
/*var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1} 
  x[slideIndex-1].style.display = "block"; 
  setTimeout(carousel, 2000); 
}*/
