//
// typed.js
// Theme module
//

(function() {
  
  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="typed"]');


  //
  // Methods
  //

  function init(elem) {
    var typed = new Typed(elem, {
      strings: JSON.parse(elem.dataset.strings),
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 1000,
      loop: true
    })
  }


  //
  // Events
  //

  if ( toggle ) {
    [].forEach.call(toggle, function(elem) {
      init(elem);
    });
  }
  
})();