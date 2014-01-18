// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {
  $('#booking-details-complete').click(function(event) {  
      // showContactForm()
  });

  $('#contact-info-complete').click(function(event) {
      // showScheduleForm()
  });

  $('#schedule-time-complete').click(function(event) {
      // showPaymentForm()
  });

   $('#payment-info-complete').click(function(event) {
      // showFinalBookingForm()
  });

   //hash listener
  $(window).hashchange(function() 
   {
      var hash = location.hash;
      
      //if hash is blank show the first form
      if (hash == "") 
        {
          showFirstForm();
        } 
      else 
        {
          showNextForm(hash);
        }
   });
 
   $(window).hashchange();
    //end hash listener 

   $( "#datepicker" ).datepicker({
      minDate: 0,
      showOtherMonths: true,
      selectOtherMonths: true
   });
 
 // BEGIN STRIPE //
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
  // END STRIPE //

  // BEGIN CLEANING BUTTONS //
    $('#house-extras button').click(function() {
      $(this).blur();
      $(this).toggleClass('btn-success');
      updateHours();
    });

    $('.house-details.rooms button').click(function() {
      $('.house-details button').addClass('active').not(this).removeClass('active');
      $(this).addClass('btn btn-success').siblings('.btn').removeClass('btn-success');
    });
  
    $(".bedroom.btn").click(function() {
      $("#bedroom-value").val($(this).text());
    });     
  // END CLEANING BUTTONS //
});

function showNextForm(form)
  {
    hideAllForms();  
    $(form).css("display", "block");
      if (form == "#finalize-booking")
      {
        updateConfimrationPage()  
      }

      if (form == "#payment-info")
      {
        $(".card-assurance").css("display", "block");
      }
  }

function showFirstForm()
  { 
    hideAllForms();
    $("#booking-details").css("display", "block");
  }

function hideAllForms()
  {
    $("#booking-details").css("display", "none");
    $("#contact-info").css("display", "none");  
    $("#schedule-time").css("display", "none");
    $("#payment-info").css("display", "none");
    $(".card-assurance").css("display", "none");
    $("#finalize-booking").css("display", "none");
  }

function divToDisplay(hash)
  {
    switch (hash)
    {
      case "#contact-info" :
        showContactForm();
        break;

      case "#schedule-time":
        showScheduleForm();
        break;

      case "#payment-info":
        showPaymentForm();
        break;

      case "#finalize-booking":
        showFinalBookingForm();
        break;
    }
  }

  // BEGIN UPDATE DROPDOWN HOURS //
function updateHours()
  {
    var extraCount = countExtras();
    
    var bedroomCount = document.getElementById('bedroom-value').value;
    bedroomCount = parseFirstCharacter(bedroomCount);
    bedroomCount = Number(bedroomCount);
    
    var bathroomCount = document.getElementById('bathroom-value').value;
    bathroomCount = parseFirstCharacter(bathroomCount);
    bathroomCount = Number(bathroomCount);

    document.getElementById('booking_hours').value = extraCount + bedroomCount + bathroomCount;
    document.getElementById('recommended_hours').innerHTML = extraCount + bedroomCount + bathroomCount;
  }

function countExtras() 
  {
    var extras = document.getElementById('extras-value').value;
    
    if(extras == "") 
    {
      return 0;
    } 
      else 
    {
      return extras.split(",").length;
    }
  }

  function parseFirstCharacter(string)
  {
    return string.charAt(0);
  }

  // END UPDATE DROPDOWN HOURS //


  // BEGIN SET ROOM AND VALUES TO HIDDEN FIELDS //
function setBedroomValue(rooms)
  {
    document.getElementById('bedroom-value').value = rooms;
    updateHours();
  }

function setBathroomValue(rooms)
  {
    document.getElementById('bathroom-value').value = rooms;
    updateHours();
  }

// global variable no no
var extrasValues = [];

function setExtrasValue(job) 
  { 
    if (extrasValues.indexOf(job) > -1) 
    {
      var index = extrasValues.indexOf(job);
      extrasValues.splice(index, 1);
    } 
    else 
    {
      extrasValues.push(job)
    }
      document.getElementById('extras-value').value = extrasValues;
  }

// END SET ROOM AND VALUES TO HIDDEN FIELDS //    

//START GOOGLE AUTOCOMPLETE ADDRESS FIELD//
 google.maps.event.addDomListener(window, 'load', initialize);

 function initialize() {
  //unrelated to Google: sets recommended hours value that user sees
  document.getElementById('recommended_hours').innerHTML = 2;
  
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

//START UPDATE CONFIRMATION PAGE//
function updateConfimrationPage()
  {
    var street_address = document.getElementById('street_address').value;
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;

    var bookingPrice = document.getElementById('booking_hours').value * gon.price;
    var finalPrice = bookingPrice + gon.supplies_price;
    
    document.getElementById('booking-price').innerHTML = "$" + bookingPrice;
    document.getElementById('supply-cost').innerHTML = "$" + gon.supplies_price;
    document.getElementById('confirmation-time').innerHTML = "Mon Feb 10 2014 @ 9:30 AM";
    document.getElementById('confirmation-hours').innerHTML = document.getElementById('booking_hours').value + " " + "hour cleaning" + " " + "($" + gon.price +  "/hour)";
    document.getElementById('confirmation-bedrooms').innerHTML = document.getElementById('bedroom-value').value;
    document.getElementById('confirmation-bathrooms').innerHTML = document.getElementById('bathroom-value').value;
    document.getElementById('confirmation-extras').innerHTML = document.getElementById('extras-value').value;
    document.getElementById('confirmation-address').innerHTML = street_address;
    document.getElementById('confirmation-city-state-zip').innerHTML = city + ", " + state + " " + zipcode;
    document.getElementById('confirmation-name').innerHTML = document.getElementById('booking_user_name').value;
    document.getElementById('confirmation-email').innerHTML = document.getElementById('booking_user_email').value;
    document.getElementById('confirmation-phone').innerHTML = document.getElementById('booking_user_phone').value;
    document.getElementById('confirmation-amount').innerHTML = "$" + finalPrice;
     
  }
//END UPDATE CONFIRMATION PAGE//

