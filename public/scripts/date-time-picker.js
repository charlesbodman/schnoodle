$(document).ready(function(e){
  const dateChosen = [];
  $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      $(this).closest('td').toggleClass('down');
      const index = dateChosen.indexOf(date.format('YYYY-MM-DD'));

      // Remove the date if already chosen (deselect)
      if (index > -1) {
        dateChosen.splice(index, 1);
      } else {
        dateChosen.push(date.format('YYYY-MM-DD'));
      }
    }
  });

 $('#chooseTime').on('click', event => {
    event.preventDefault();
    for(let date of dateChosen) {
      console.log(date);
      const $date = $('<p>').text(date);
      const $startText = $('<p>').text('Start Time');
      const $startTime = $('<input>').addClass('startTime').timepicker({});
      const $endText = $('<p>').text('End Time');
      const $endTime  = $('<input>').addClass('endTime').timepicker({});
      $('#time').append($date, $startText, $startTime, $endText, $endTime);
    }

 });
});
