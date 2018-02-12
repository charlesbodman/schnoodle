$(document).ready( function() {


  const countSlotIDs = JSON.parse($('#countSlotIDs').text());
  const arraySlotsData = JSON.parse($('#slotsData').text());

  
  const arrayValueInOrderWithLabel = [];
  const arrayLabelInOrder = [];

  arraySlotsData.forEach(function (item) {
    arrayValueInOrderWithLabel.push(Number(countSlotIDs[item.id]));
    arrayLabelInOrder.push(`${item.date} - ${item.start_time} / ${item.end_time}`);
  });
  


  console.log(arrayLabelInOrder);
  console.log(arrayValueInOrderWithLabel);

  /*

  countSlotIDs
  {"7":"3","8":"7","9":"4"}

  slotsData
[{"id":7,"date":"2018-02-28","start_time":"02:00 AM","end_time":"04:00 AM","event_id":3},
{"id":8,"date":"2018-02-27","start_time":"12:00 AM","end_time":"01:00 AM","event_id":3},
{"id":9,"date":"2018-02-23","start_time":"05:00 AM","end_time":"06:00 AM","event_id":3}]

  */



  //bar
  var ctxB = document.getElementById("barChart").getContext('2d');
  var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
      labels: arrayLabelInOrder,
      datasets: [{
        label: '# of Votes',
        data: arrayValueInOrderWithLabel,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    optionss: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

});
