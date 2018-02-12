$(document).ready(function() {

  const attenndeeData = {};
  const attenndeeSlotsID =[];

  const numberOfSlots = $('table').find('th').length - 1;
  const $nameAttendee = $('<input type="text" placeholder="name" class="text-primary form-fill">');
  const $emailAttendee = $('<input type="email" placeholder="email" class="text-primary form-fill">');
  const $tr = $('<tr>');
  $tr.append($nameAttendee);
  $tr.append('<tr>');
  $tr.append($emailAttendee);
  for (let i = 0; i < numberOfSlots; i++) {
    const $checkbox = $('<input type="checkbox" name="amount" class="checkbox"/>');
    const $td = $('<td>').addClass('checkbox-cell').append($checkbox);
    $td.append($checkbox);
    $tr.append($td);
  }
  $('#slots').append($tr);

  $('td').change(function(event) {

    const idChosen = $(this).parents('table').find('tr:first-child').children('th:nth-child(' + (this.cellIndex + 2) + ')').attr('id');

    if (attenndeeSlotsID.indexOf(idChosen) === -1) {
      attenndeeSlotsID.push(idChosen);
    } else {
      attenndeeSlotsID.splice(attenndeeSlotsID.indexOf(idChosen), 1);
    }

    attenndeeData.name = $(this).closest('tr').find('input[type="text"]').val();
    attenndeeData.email = $(this).closest('tr').find('input[type="email"]').val();
    attenndeeData.slotsID = attenndeeSlotsID;

  });

  $('#attendee-done').on('click', (event) => {

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/events/attendee-slots",
      data: attenndeeData,
      success: function(result){
      }

    });
  });

});

