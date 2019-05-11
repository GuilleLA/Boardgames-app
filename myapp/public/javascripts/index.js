function initMap() {
  const mapContainer = document.getElementById("map")
  

  if (!mapContainer) return;

  const myMap = new MyMap(mapContainer)
  
  
  myMap.init()
  if(document.getElementById('map').dataset.id === 'yo'){
    addUsersToMap(myMap)
  }
  else {
    addEventToMap(myMap)
  }
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
      // response.data.forEach(coordinate => {
      //   myMap.addMarker(
      //     coordinate.coordinates[1],
      //     coordinate.coordinates[0]
      //   )
      // })
    })
    .catch(console.log)
}

function addUsersToMap(myMap) {
  const id = document.getElementById("map").dataset.id
  axios.get(`/stats/coordinates`)
    .then(response => {
      const positions = response.data.map(item => {
        const loc = {
          lat: item.coordinates[1],
          lng: item.coordinates[0]
        }
        return loc
      })
      positions.forEach(item => myMap.addMarker(item.lat, item.lng))
      // response.data.forEach(coordinate => {
      //   myMap.addMarker(
      //     coordinate.coordinates[1],
      //     coordinate.coordinates[0]
      //   )
      // })
    })
    .catch(console.log)
}