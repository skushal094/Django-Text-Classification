'use strict';

 
$(() => {

    // $(`
    // <div class="modal fade" id="alertNotify" tabindex="-1" role="dialog" aria-hidden="true">
    //     <div class="modal-dialog" role="document">
    //         <div class="modal-content">
    //         <div class="modal-header">
    //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //             </button>
    //         </div>
    //         <div class="modal-body"></div>
    //         <div class="modal-footer">
    //             <button type="button" class="btn btn-sm btn-block btn-secondary" data-dismiss="modal">Ok</button>
    //         </div>
    //         </div>
    //     </div>
    // </div>
    // `).appendTo('body');
    
    window.dateFormatted = (timestamp) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        try {
            var ts = timestamp ? new Date(timestamp) : new Date();
        } catch (err) {
            var ts = new Date();
        }
        return `${months[ ts.getMonth() ]}, ${ts.getDate()}`;
    }

    window.distFromTop = (selector) => {
        return $(selector).offset().top - $(window).scrollTop();
    }
    
    // window.notify = (text = '') => {        
    //     $('#alertNotify').find('modal-body').html('');
    //     $('#alertNotify').modal({ 
    //         backdrop: true, 
    //         focus: true 
    //     });
    // }

    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if(form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
});