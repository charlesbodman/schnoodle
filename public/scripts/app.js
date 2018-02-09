$(() => {

   var dateChosen = [];
      $(document).ready(function(){
        $('#calendar').fullCalendar({
          dayClick: function(date, jsEvent, view) {
            $(this).closest('td').toggleClass('down');
            let index = dateChosen.indexOf(date.format('YYYY-MM-DD'));
            if (index > -1) {
              dateChosen.splice(index, 1);
            } else {
              dateChosen.push(date.format('YYYY-MM-DD'));
            }
            for(var date of dateChosen){
              console.log(date);
            }
          }
        });
      });
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
