function initMap() {
  const mapContainer = document.getElementById("map")
  

  if (!mapContainer) return;

  const myMap = new MyMap(mapContainer)
  
  myMap.init()
  addEventToMap(myMap)
}

function addEventToMap(myMap) {
  const id = document.getElementById("map").dataset.id
  axios.get(`/events/${id}/coordinates`)
    .then(response => {
      const position = {
        lat: response.data.coordinates[1],
        lng: response.data.coordinates[0]
      }
      myMap.addMarker(position.lat, position.lng)
      myMap.googleMap.setCenter(position)
      // response.data.forEach(coordinate => {
      //   myMap.addMarker(
      //     coordinate.coordinates[1],
      //     coordinate.coordinates[0]
      //   )
      // })
    })
    .catch(console.log)
}