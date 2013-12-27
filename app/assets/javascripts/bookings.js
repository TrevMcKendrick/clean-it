// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// $(document).ready(function() {
//   $('#booking-details-complete').click(function(event) {  
//       $("#booking-details").css("display", "none");
//       $("#contact-info").css("display", "block");   
//   });

//   $('#contact-info-complete').click(function(event) {
//       $("#contact-info").css("display", "none");
//       $("#schedule-time").css("display", "block");
//   });

//   $('#schedule-time-complete').click(function(event) {
//       $("#schedule-time").css("display", "none");
//       $("#payment-info").css("display", "block");
//       $("#finalize-booking").css("display", "block");
//   });

//   $(function() {
//     $( "#schedule-day" ).datepicker({
//       minDate: 0,
//       showOtherMonths: true,
//       selectOtherMonths: true
//     });
//   });
 
    var stripeResponseHandler = function(status, response) {
      var $form = $('#cleaning-form');
 
      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // token contains id, last4, and card type
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        $form.get(0).submit();
      }
    };
 
    $(function($) {
      $('#cleaning-form').submit(function(e) {
        var $form = $(this);
 
        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);
 
        Stripe.createToken($form, stripeResponseHandler);
 
        // Prevent the form from submitting with the default action
        return false;
      });
    });
  
// });