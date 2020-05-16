//
// countup.js
// Theme module
//

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="countup"]');


  //
  // Methods
  //

  function init(elem) {
    var startVal = (elem.dataset.from) ? +elem.dataset.from : null;
    var endVal = (elem.dataset.to) ? +elem.dataset.to : null;
    var decimals = (elem.dataset.decimals) ? +elem.dataset.decimals : null;
    var duration = (elem.dataset.duration) ? +elem.dataset.duration : null;
    var options = (elem.dataset.options) ? JSON.parse(elem.dataset.options) : null;
    var countUp = new CountUp(elem, startVal, endVal, decimals, duration, options);

    if (!countUp.error) {
      countUp.start();
      elem.classList.add('counted');
    } else {
      console.error(countUp.error);
    }
  }


  //
  // Events
  //

  [].forEach.call(toggle, function(elem) {
    if (elem.getAttribute('data-aos-id') !== 'countup:in') {
      init(elem);
    }
  });

  document.addEventListener('aos:in:countup:in', function(e) {
    if (e.detail instanceof Element) {
      init(e.detail);
    } else {
      var toCount = document.querySelectorAll('.aos-animate[data-aos-id="countup:in"]:not(.counted)');
      [].forEach.call(toCount, function(elem) {
        init(elem);
      });
    }
  });
  
})();