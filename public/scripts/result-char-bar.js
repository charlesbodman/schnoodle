$(document).ready( function() {

  // Gets the data from the events:id page
  const countSlotIDs = JSON.parse($('#countSlotIDs').text());
  const arraySlotsData = JSON.parse($('#slotsData').text());


  const arrayValueInTheLabelOrder = [];
  const arrayLabelInOrder = [];

  // Passes to arrays to feed the bar chart
  arraySlotsData.forEach(function (item) {
    arrayValueInTheLabelOrder.push(Number(countSlotIDs[item.id]));
    arrayLabelInOrder.push(`${item.date} - ${item.start_time} / ${item.end_time}`);
  });

  // bar chart
  var ctxB = document.getElementById("barChart").getContext('2d');
  Chart.defaults.global.scaleBeginAtZero = true;
  var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
      labels: arrayLabelInOrder,
      datasets: [{
        label: 'Number of Votes',
        data: arrayValueInTheLabelOrder,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)'
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
    options: {
        scales: {
            yAxes: [{
                ticks: {
                  scaleBeginAtZero : true
                }
            }]
        }
    }
});

});
