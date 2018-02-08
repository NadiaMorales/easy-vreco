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

    var image = 'https://cdn.jsdelivr.net/emojione/assets/svg/1f6b4-1f3fd.svg'
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
        directionsDisplay.setDirections(response)
        var star = response.routes[0].legs[0].start_location
        var end = response.routes[0].legs[0].end_location
        function addMarkerStart (pos) {
          var iconPartida = 'http://maps.google.com/mapfiles/kml/shapes/cycling.png'
          new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            map: map,
            icon: iconPartida
          })
        }
        function addMarkerFinish (pos) {
          var iconTermino = 'https://cdn.jsdelivr.net/emojione/assets/png/1f6b5.png?v=2.2.7'
          new google.maps.Marker({
              position: pos,
              animation: google.maps.Animation.DROP,
              map: map,
              icon: iconTermino
            })
        }
        addMarkerStart(star)
        addMarkerFinish(end)
      } else {
        window.alert('No encontramos una ruta.')
      }
    })
  }
  directionsDisplay.setMap(map)
  directionsDisplay.setOptions({ suppressMarkers: true })

  var trazarRuta = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta)
}
