//
// smooth-scroll.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var href = 'a[data-smooth-scroll]';


  //
  // Methods
  //

  function init() {
    var scroll = new SmoothScroll(href);
  }


  //
  // Events
  //

  if ( SmoothScroll ) {
    init();
  }

})();