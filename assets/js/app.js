function initMap () {
  var lat = { lat: -33.418868, lng: -70.641691 }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: lat
  })

  function buscar () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError)
    }
  }

  document.getElementById('encuentrame').addEventListener('click', buscar)
  var latitud, longitud

  var funcionExito = function (posicion) {
    latitud = posicion.coords.latitude
    longitud = posicion.coords.longitude

    var image = 'http://maps.google.com/mapfiles/kml/shapes/cycling.png'
    var miUbicacion = new google.maps.Marker({
      position: { lat: latitud, lng: longitud },
      animation: google.maps.Animation.DROP,
      map: map,
      icon: image
    })

    map.setZoom(17)
    map.setCenter({ lat: latitud, lng: longitud })
  }

  var funcionError = function (error) {
    alert('tenemos un problema con encontrar tu ubicación')
  }
  var inputPartida = document.getElementById('punto-partida')
  var inputDestino = document.getElementById('punto-destino')

  new google.maps.places.Autocomplete(inputPartida)
  new google.maps.places.Autocomplete(inputDestino)

  var directionsService = new google.maps.DirectionsService()
  var directionsDisplay = new google.maps.DirectionsRenderer()

  var calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response)
      } else {
        window.alert('No encontramos una ruta.')
      }
    })
  }
  directionsDisplay.setMap(map)

  var trazarRuta = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta)
 
  var image = 'http://maps.google.com/mapfiles/kml/shapes/cycling.png'
  var iconRoute = new google.maps.Marker({
      position: directionsDisplay,
      map: map,
      icon: image
  })
}
