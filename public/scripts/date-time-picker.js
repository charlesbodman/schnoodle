$(document).ready(function(e){
  const dateChosen = [];
  $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      $(this).closest('td').toggleClass('down');
      const index = dateChosen.indexOf(date.format('YYYY-MM-DD'));

      // Remove the date if already chosen (deselect)
      if (index > -1) {
       console.log($( "h3:contains(date.format('YYYY-MM-DD'))" ).text());
       // .css( "text-decoration", "underline" );
        dateChosen.splice(index, 1);

      } else {

        dateChosen.push(date.format('YYYY-MM-DD'));
        const $timeDiv = $('<div>');
        const $date = $('<h3>').text(date.format('YYYY-MM-DD'));
        const $startText = $('<p>').text('Start Time');
        const $startTime = $('<input>').addClass('startTime').timepicker({});
        const $endText = $('<p>').text('End Time');
        const $endTime  = $('<input>').addClass('endTime').timepicker({});
        const $div = $($timeDiv).append($date, $startText, $startTime, $endText, $endTime);
        const $time = $('#time').append($div);

      }
    }
  });
});
//pick the date
//check if the date is in slot
//yes delete from the slot
//else add in the slot
