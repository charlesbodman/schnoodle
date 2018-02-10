$(document).ready(function() {

  // Makes a randon generated url for a event
  function generateRandomUrl() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return "https://events/" + text;
  }

  // Sets the url and aplies it on the create event page
  const eventURL = generateRandomUrl();
  $('#randomUrl').val(eventURL);
  $('#copy').on('click', (event) => {
    $('#randomUrl').select();
    document.execCommand("copy");
    $("#copy").text("Copied to clipboard").show();
  });

  // Objets to save the date from the form
  const eventData = {};
  const slots = {};

  // Creates the calendar, picks date(s), start and end times and sets data into slots object.
  $('#calendar').fullCalendar({

    dayClick: function(date, jsEvent, view) {
      
      $(this).closest('td').toggleClass('down');
      if (slots[date.format('YYYY-MM-DD')]) {
        delete slots[date.format('YYYY-MM-DD')];
        $(`h3:contains(${date.format('YYYY-MM-DD')})`).parent().remove();
      } else {
        slots[date.format('YYYY-MM-DD')] = {
          startTime: 0,
          endTime: 0
        };
        const $timeDiv = $('<div>');
        const $date = $('<h3>').text(date.format('YYYY-MM-DD'));
        const $startText = $('<p>').text('Start Time');
        const $startTime = $('<input>').addClass('startTime').timepicker({
          change: function() {
            slots[date.format('YYYY-MM-DD')].startTime = $startTime.val();
          }
        });
        const $endText = $('<p>').text('End Time');
        const $endTime  = $('<input>').addClass('endTime').timepicker({
          change: function() {
            slots[date.format('YYYY-MM-DD')].endTime = $endTime.val();
          }
        });
        const $div = $($timeDiv).append($date, $startText, $startTime, $endText, $endTime);
        const $time = $('#time').append($div);

        eventData.slots = slots;
      }
    }
  });

  // Prevents default behavior of the form event submission and sets the data in a object to post to server using
  $('#eventForm').on('submit', (event) => {

    event.preventDefault();

    eventData.organizerName = $('#userName').val();
    eventData.organizerEmail = $('#email').val();
    eventData.title = $('#title').val();
    eventData.location = $('#location').val();
    eventData.description = $('#description').val();
    eventData.url = eventURL;

    $.ajax({
      method: "POST",
      url: "/events",
      data: eventData,
      success: function(result){
        //////////////////////////
        // TODO: REMOVE OR CHANGE
        console.log("it workds");
        //////////////////////////
      }

    });
  });
});




