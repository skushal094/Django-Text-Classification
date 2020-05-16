//
// Highlight.js ==================================
//

'use strict';

var Highlight = (function() {

  //
  // Variables
  //

  var highlight = document.querySelectorAll('.highlight');


  //
  // Methods
  //

  function init(elem) {
    hljs.highlightBlock(elem);
  }


  //
  // Events
  //

  [].forEach.call(highlight, function(elem) {
    init(elem);
  });

})();