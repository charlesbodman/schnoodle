$(document).ready( function() {


  const countSlotIDs = JSON.parse($('#countSlotIDs').text());
  const arraySlotsData = JSON.parse($('#slotsData').text());


  const arrayValueInOrderWithLabel = [];
  const arrayLabelInOrder = [];

  arraySlotsData.forEach(function (item) {
    arrayValueInOrderWithLabel.push(Number(countSlotIDs[item.id]));
    arrayLabelInOrder.push(item.date + " " + item.start_time + "-" +item.end_time);
  });



  console.log(arrayLabelInOrder);
  console.log(arrayValueInOrderWithLabel);

  //bar
  var ctxB = document.getElementById("barChart").getContext('2d');
  ctxB.canvas.width = 300;

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
    options: {
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


