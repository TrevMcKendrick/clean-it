// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {
  $('#booking-details-complete').click(function(event) {  
      $("#booking-details").css("display", "none");
      $("#contact-info").css("display", "block");   
  });

  $('#contact-info-complete').click(function(event) {
      $("#contact-info").css("display", "none");
      $("#schedule-time").css("display", "block");
  });

  $('#schedule-time-complete').click(function(event) {
      $("#schedule-time").css("display", "none");
      $("#payment-info").css("display", "block");
      $("#finalize-booking").css("display", "block");
  });

  $(function() {
    $( "#schedule-day" ).datepicker({
      minDate: 0,
      showOtherMonths: true,
      selectOtherMonths: true
    });
  });
 
 // // BEGIN STRIPE //
    // var stripeResponseHandler = function(status, response) {
    //   var $form = $('#cleaning-form');
 
    //   if (response.error) {
    //     // Show the errors on the form
    //     $form.find('.payment-errors').text(response.error.message);
    //     $form.find('button').prop('disabled', false);
    //   } else {
    //     // token contains id, last4, and card type
    //     var token = response.id;
    //     // Insert the token into the form so it gets submitted to the server
    //     $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    //     // and re-submit
    //     $form.get(0).submit();
    //   }
    // };
 
    // $(function($) {
    //   $('#cleaning-form').submit(function(e) {
    //     var $form = $(this);
 
    //     // Disable the submit button to prevent repeated clicks
    //     $form.find('button').prop('disabled', true);
 
    //     Stripe.createToken($form, stripeResponseHandler);
 
    //     // Prevent the form from submitting with the default action
    //     return false;
    //   });
    // });
 //  // END STRIPE //

  // BEGIN JOB BUTTONS //
    $('#extras button').click(function() {
      $(this).blur();
      $(this).toggleClass('btn-success');
    });

    $('.house-details.rooms button').click(function() {
      $('.house-details button').addClass('active').not(this).removeClass('active');
        $(this).addClass('btn btn-success').siblings('.btn').removeClass('btn-success');
    });
  // END JOB BUTTONS //

    $(".bedroom.btn").click(function() {
      $("#bedroom-value").val($(this).text());
    });     

});


  // BEGIN SET ROOM AND VALUES TO HIDDEN FIELDS //
function setBedroomValue(rooms)
    {
      document.getElementById('bedroom-value').value = rooms;
    }

function setBathroomValue(rooms)
    {
      document.getElementById('bathroom-value').value = rooms;
    }

// global variable no no
var extrasValues = [];
function setExtrasValue(job) { 
      if(extrasValues.indexOf(job) > -1) {
        var index = extrasValues.indexOf(job);
        extrasValues.splice(index, 1);
      } 
      else {
        extrasValues.push(job)
      }
      document.getElementById('extras-value').value = extrasValues;
    }


  // END SET ROOM AND VALUES TO HIDDEN FIELDS //    

//START GOOGLE AUTOCOMPLETE ADDRESS FIELD//
  google.maps.event.addDomListener(window, 'load', initialize);

 function initialize() {

  var input = document.getElementById('street_address');
  var autocomplete = new google.maps.places.Autocomplete(input);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
                fillInAddress();

  });

  function fillInAddress() {

    var place = autocomplete.getPlace();

    var street_number = place.address_components[0].short_name;
    var street_name = place.address_components[1].short_name;
    var city = place.address_components[2].short_name;
    var state = place.address_components[4].short_name;
    var zipcode = place.address_components[6].short_name;
    var address = street_number + " " + street_name

    document.getElementById('street_address').value = street_address;
    document.getElementById('city').value = city;
    document.getElementById('state').value = state;
    document.getElementById('zipcode').value = zipcode;

    //hack because google autocomplete listens to blur event and refills autocomplete//
    var street_address = $("#street_address");
    street_address.blur();   
    setTimeout(function(){
      street_address.val(address)
    },0);

  }

}
//END GOOGLE AUTOCOMPLETE ADDRESS FIELD//
