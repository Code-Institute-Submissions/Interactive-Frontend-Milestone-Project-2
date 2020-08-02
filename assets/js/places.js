function initMap() {
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
      }


