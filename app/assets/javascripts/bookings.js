// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var scheduled_time = new Date();

$(document).ready(function() {

// BEGIN CALENDAR 
   $("#calendar").fullCalendar({
      dayClick: function(date, allDay, jsEvent, view) {
        $(".fc-day").css("background-color", "#F8F8FF");
        $(this).css('background-color', '#8eee00');
        $("#schedule-time-complete").attr('class', 'btn btn-success btn-block');
        scheduled_time.setDate(date.getDate());
        scheduled_time.setMonth(date.getMonth());
        scheduled_time.setFullYear(date.getFullYear());
        document.getElementById('reservation-time').value = scheduled_time;
        updateConfirmationPage();
      },
      header: {
        left:   'prev',
        center: 'title',
        right:  'next'
      },
      weekMode: "variable"
    });


// END CALENDAR


// BEGIN DATA VALIDATION

 var validator = $("#cleaning-form").validate({
    onfocusout: function(element) { $(element).valid(); },
    onkeyup: false,
    rules: {
            "booking[user][email]": {
              remote: "/check_email_uniqueness",
              required: true
            },
            "booking[user][name]": "required",
            "booking[user][address]": "required",
            "booking[user][state]": "required",
            "booking[user][city]": "required",
            "booking[user][zipcode]": "required",
            "booking[user][phone]": "required"
           },
    messages: {
      "booking[user][email]": {
        remote: "Email already taken! Please try a different email or login above!",
        required: "Enter an email"
      },
      "booking[user][name]": "We gotta know who you are! Please enter your name.",
      "booking[user][address]": "Please enter your address! This is where the cleaning will be",
      "booking[user][state]": "Enter your state",
      "booking[user][city]": "Enter your city",
      "booking[user][zipcode]": "Enter your zipcode",
      "booking[user][phone]": "Please enter your phone. We'll use this to follow up if we have questions!"
    },
    errorPlacement: function(error,element) {
      error.appendTo($("#error_field"));
    }
  });

  // $("#name_input").blur(function() {
  //   $("#name_input").valid()
  // });

  // $("#email_input").blur(function() {
  //   $("#email_input").valid()
  // });

  // $("#street_address").blur(function() {
  //   $("#street_address").valid()
  // });

  // $("#state").blur(function() {
  //   $("#state").valid()
  // });

  // $("#city").blur(function() {
  //   $("#city").valid()
  // });

  // $("#zipcode").blur(function() {
  //   $("#zipcode").valid()
  // });

  // $("#phone_input").blur(function() {
  //   $("#phone_input").valid()
  // });


  // $( ".contact-info-item" ).blur(function() {
  //    if ( ($("#name_input").valid()) && ($("#street_address").valid()) && ($("#state").valid()) && ($("#city").valid()) && ($("#zipcode").valid()) && ($("#email_input").valid()) && ($("#phone_input").valid()) )
  //     {
  //       $("#contact-info-complete").attr('class', 'btn btn-success btn-block');
  //     }
  //     else
  //     {
  //       $("#contact-info-complete").attr('class', 'next-step btn btn-block');
  //     } 
  // });

  // function validEmailAddress()
  // {
  //   var email = $("#email_input").val();
  //   var regex = /\S+@\S+\.\S+/i; 
  //   valid = email.match(regex);
  //   return valid;
  // }


  $('#card_number').payment('formatCardNumber');
  $('#card_code').payment('formatCardCVC');

  $(".payment-form").keyup(function() {
      var cardValid = $.payment.validateCardNumber($('#card_number').val());
      var cvcValid = $.payment.validateCardCVC($('#card_code').val());
     if ( cardValid && cvcValid )
      {
        $("#payment-info-complete").attr('class', 'btn btn-success btn-block');
      }
      else
      {
        $("#payment-info-complete").attr('class', 'next-step btn btn-block');
      } 
  });

  $('#phone_input').formatter({
    'pattern': '({{999}}) {{999}}-{{9999}}',
    'persistent': false
  });

// END DATA VALIDATION  

// BEGIN HASH LISTENER //
  $(window).hashchange(function() 
   {

      var hash = location.hash;
      
      //if URL hash is blank show the first form
      if (hash == "") 
        {
          hash = "#booking-details"
        } 
      
      showNextForm(hash);
   });
 
   $(window).hashchange();

// END HASH LISTENER // 

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
  
   $( "#datepicker" ).datepicker({
      minDate: 0,
      showOtherMonths: true,
      selectOtherMonths: true
   });

  // BEGIN CALENDAR BUTTONS //

   $(".calendar-buttons button").click(function() {
      $('.calendar-buttons button').addClass('active').not(this).removeClass('active');
      $(this).addClass('btn btn-success').siblings('.btn').removeClass('btn-success');
      var time = $(this).attr("value");
      scheduled_time.setHours(parseHour(time));
      scheduled_time.setMinutes(parseMinutes(time));
      scheduled_time.setSeconds(00);
      document.getElementById('reservation-time').value = scheduled_time;
      updateConfirmationPage();
    });
   // END CALENDAR BUTTONS //


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

function parseHour(time)
{
  return time.slice(0, 2);
}

function parseMinutes(time)
{
  return time.slice(3, 5);
}




function showNextForm(form)
  { 
    hideAllForms();
    dimProgressBar();
    
    $(form).css("display", "block");

      if (form == "#booking-details")
      {
        $("#progress-bar-item-one").addClass('progress-bar-item-active');
      }

      if (form == "#contact-info")
      {
        $("#progress-bar-item-two").addClass('progress-bar-item-active');
      }

      if (form == "#schedule-time")
      {
        $("#progress-bar-item-three").addClass('progress-bar-item-active');
      }

      if (form == "#payment-info")
      {
        $(".card-assurance").css("display", "block");
        $("#progress-bar-item-four").addClass('progress-bar-item-active');
      }

      if (form == "#finalize-booking")
      {
        $("#progress-bar-item-five").addClass('progress-bar-item-active');
        updateConfirmationPage();
      }
  }

function dimProgressBar()
  {
    $(".progress-bar-item").attr('class', 'progress-bar-item');
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

    var totalHours = (extraCount / 2 ) + bedroomCount + bathroomCount;

    // document.getElementById('booking_hours').value = totalHours;

    document.getElementById('recommended_hours').innerHTML = totalHours;
    $("#booking_hours").val(totalHours);
    // $("#booking_hours").val();
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
 // google.maps.event.addDomListener(window, 'load', initialize);

 function initialize() {
  //unrelated to Google: sets recommended hours value that user sees
  document.getElementById('recommended_hours').innerHTML = 2;
  
  // var input = document.getElementById('street_address');
  // var autocomplete = new google.maps.places.Autocomplete(input);

  // google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //               fillInAddress();
  // });

    // function fillInAddress() {

    //   var place = autocomplete.getPlace();

    //   var street_number = place.address_components[0].short_name;
    //   var street_name = place.address_components[1].short_name;
    //   var city = place.address_components[2].short_name;
    //   var state = place.address_components[4].short_name;
    //   var zipcode = place.address_components[6].short_name;
    //   var address = street_number + " " + street_name

    //   document.getElementById('street_address').value = street_address;
    //   document.getElementById('city').value = city;
    //   document.getElementById('state').value = state;
    //   document.getElementById('zipcode').value = zipcode;

    //   //hack because google autocomplete listens to blur event and refills autocomplete//
    //   var street_address = $("#street_address");
    //   street_address.blur();   
    //   setTimeout(function(){
    //     street_address.val(address)
    //   },0);
    // }
  }
//END GOOGLE AUTOCOMPLETE ADDRESS FIELD//

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


//START UPDATE CONFIRMATION PAGE//
function updateConfirmationPage()
  {
    var street_address = document.getElementById('street_address').value;
    // street_address.replace(', United States','');
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;

    var bookingPrice = document.getElementById('booking_hours').value * gon.price;
    var finalPrice = bookingPrice + gon.supplies_price;
    
    document.getElementById('booking-price').innerHTML = "$" + bookingPrice;
    document.getElementById('supply-cost').innerHTML = "$" + gon.supplies_price;

    document.getElementById('confirmation-time').innerHTML = $.fullCalendar.formatDate(scheduled_time, "dddd MMM d") + " @ " + $.fullCalendar.formatDate(scheduled_time, "h:mm TT");
    document.getElementById('confirmation-hours').innerHTML = document.getElementById('booking_hours').value + " " + "hour cleaning" + " " + "($" + gon.price +  "/hour)";
    document.getElementById('confirmation-bedrooms').innerHTML = document.getElementById('bedroom-value').value;
    document.getElementById('confirmation-bathrooms').innerHTML = document.getElementById('bathroom-value').value;
    document.getElementById('confirmation-extras').innerHTML = document.getElementById('extras-value').value;
    document.getElementById('confirmation-address').innerHTML = toTitleCase(street_address.replace(', United States',''));
    document.getElementById('confirmation-city-state-zip').innerHTML = toTitleCase(city) + ", " + state.toUpperCase(); + " " + zipcode;
    document.getElementById('confirmation-name').innerHTML = toTitleCase(document.getElementById('name_input').value);
    document.getElementById('confirmation-email').innerHTML = document.getElementById('email_input').value;
    document.getElementById('confirmation-phone').innerHTML = document.getElementById('phone_input').value;
    document.getElementById('confirmation-amount').innerHTML = "$" + finalPrice;
     


    // document.getElementById('confirmation-bedrooms').innerHTML = "2 bedrooms";
    // document.getElementById('confirmation-bathrooms').innerHTML = "3+ bathrooms";
    // document.getElementById('confirmation-extras').innerHTML = "oven,cabinets,fridge,walls";
    // document.getElementById('confirmation-address').innerHTML = "6057 Primrose Avenue";
    // document.getElementById('confirmation-city-state-zip').innerHTML = "Temple City, CA 91780";
    // document.getElementById('confirmation-name').innerHTML = "Trevor McKendrick";
    // document.getElementById('confirmation-email').innerHTML = "trevormckendrick@gmail.com";
    // document.getElementById('confirmation-phone').innerHTML = "626-244-4636";


  }



//END UPDATE CONFIRMATION PAGE//
