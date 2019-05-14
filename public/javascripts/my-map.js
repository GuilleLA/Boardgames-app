class MyMap {
  constructor(container) {
    this.container = container;
    this.googleMap = null;
    this.markers = [];
  }

  init() {
    this.googleMap = new google.maps.Map(this.container, {
      zoom: 5,
      center: { lat: 40.417621, lng: -3.706213 }
    });
  }

  addMarker(lat, lng) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap
    });

    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }

  onClick(cb) {
    this.googleMap.addListener('click', cb);
  }
}