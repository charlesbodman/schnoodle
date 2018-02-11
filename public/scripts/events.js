$(document).ready(function() {

  const numberOfSlots = $('table').find('th').length - 1;
  const $name = $('<input type="text" placeholder="name">');
  const $tr = $('<tr>');
  $tr.append($name);
  for (let i = 0; i < numberOfSlots; i++) {
    const $checkbox = $('<input type="checkbox" name="amount" />');
    const $td = $('<td>').append($checkbox);
    $td.append($checkbox);
    $tr.append($td);
  }
  $('#slots').append($tr);

  $('td').change(function() {
    console.log (this.cellIndex);
    //this is attenndee
    console.log($(this).closest('tr').find('input[type="text"]').val());
    //this is time 
    console.log($(this).parents('table').find('tr:first-child').children('th:nth-child(' + (this.cellIndex + 2) + ')').html())

  });
});

