$(document).ready(function() {

  // Get a array of days in the datepicker
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
      for(var date of dateChosen){
        
        ///////////////////////
        // REMEMBER TO REMOVE //
        console.log(date);
        ////////////////////////
      }
    }
  });

});
