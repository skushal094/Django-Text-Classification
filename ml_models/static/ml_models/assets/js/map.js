//
// map.js
// Theme module
//

(function() {

  //
  // Variables
  //

  var map = document.querySelectorAll('[data-toggle="map"]');

  var accessToken = 'pk.eyJ1IjoicXVldGV4dCIsImEiOiJjanY4cm9qbGMwbDZ1NGRuM29zd24xb3ZhIn0.UccnirfRyzSDLMwcVye-EQ';


  //
  // Methods
  //

  function init(elem) {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: elem,
      style: 'mapbox://styles/mapbox/light-v9',
      center: JSON.parse(elem.dataset.center),
      zoom: elem.dataset.zoom,
      scrollZoom: false,
      interactive: false
    });
  }


  //
  // Events
  //

  if (map) {
    [].forEach.call(map, function(elem) {
      init(elem);
    });
  }

})();
