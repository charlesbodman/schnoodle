$(document).ready(function(e) {

  function generateRandomUrl() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return "https://events/" + text;
  }

  // console.log(dateChosen);
  const url = generateRandomUrl();
   $('#randomUrl').val(url);
   $('#copy').on('click', (event)=>{
      $('#randomUrl').select();
      document.execCommand("copy");
      $("#copy").text("Copied to clipboard").show();
   });

  const eventData = {};
  const slots = {};
  // const dateChosen = [];

  $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      $(this).closest('td').toggleClass('down');
      // const index = dateChosen.indexOf(date.format('YYYY-MM-DD'));
      // slots[date.format('YYYY-MM-DD')] = {};

      if (slots[date.format('YYYY-MM-DD')]) {
          delete slots[date.format('YYYY-MM-DD')];
          $(`h3:contains(${date.format('YYYY-MM-DD')})`).parent().remove();
      } else {
        slots[date.format('YYYY-MM-DD')] = {
          startTime: 0,
          endTime: 0
        }
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
        // console.log(eventData);
      }
    }
  });

  $('#eventForm').on('submit', (event) => {

    event.preventDefault();

    eventData.organizer_name = $('#userName').val();
    eventData.organizer_email = $('#email').val();
    eventData.title = $('#title').val();
    eventData.location = $('#location').val();
    eventData.description = $('#description').val();
    eventData.url = url;

    console.log(eventData);
    $.ajax({
      method: "POST",
      url: "/events",
      data: eventData,
      success: function(result){
        console.log("it workds")
      }

    });

  });

//post to route stats here


});




