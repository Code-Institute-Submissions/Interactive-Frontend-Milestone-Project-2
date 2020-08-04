/*function initMap() {
        // Create the map.
        const pyrmont = {
          lat: 59.32,
          lng: 18.06
        };
        const map = new google.maps.Map(document.getElementById("map"), {
          center: pyrmont,
          zoom: 15
        }); // Create the places service.

        const service = new google.maps.places.PlacesService(map);
        let getNextPage;
        
        // Perform a nearby search.

        service.nearbySearch(
          {
            location: pyrmont,
            radius: 3500,
            type:"cafe"
          },
          (results, status, pagination) => {
            if (status !== "OK") return;
            createMarkers(results, map);
         

          }
        );
      }

      function createMarkers(places, map) {
        const bounds = new google.maps.LatLngBounds();
        const placesList = document.getElementById("places");

        for (let i = 0, place; (place = places[i]); i++) {
          const image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
          const li = document.createElement("li");
          li.textContent = place.name;
          placesList.appendChild(li);
          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      }*/

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
    zoom: 12,
  });
  // Create the places service.
  service = new google.maps.places.PlacesService(map);

  // Perform a nearby search.
  var choices = document.forms["choice"].elements["choice"];
  for (var i = 0, max = choices.length; i < max; i++) {
    choices[i].onclick = function () {
      ns(this.value);
    };
  }
}
function ns(loctype) {
  service.nearbySearch(
    { location: pyrmont, radius: 3500, type: loctype },
    (results, status, pagination) => {
      if (status !== "OK") return;
      console.log("results"+results);
      
      createMarkers(results, map);
    }
  );
}

function createMarkers(places, map) {
  console.log(placesList);
  if (placesList === undefined || placesList.length === 0) {
    //placesList = document.getElementById("places");
    console.log("insideif");
  } else {
    placesList = [];
    console.log("insideelse" + placesList);
  }
  const bounds = new google.maps.LatLngBounds();

  clearMarkers();
  for (let i = 0, place; (place = places[i]); i++) {
    /*const image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };*/
    let marker = new google.maps.Marker({
      map,
      //icon: image,
      label: labels[labelIndex++ % labels.length],
      title: place.name,
      position: place.geometry.location,
    });
    markers.push(marker);
    console.log("placeList"+placesList);
    placesList.push(place.name);

    /* li.textContent = place.name;
    placesList.appendChild(li);*/
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
