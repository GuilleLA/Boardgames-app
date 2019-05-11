window.onload = function() {
  axios.get(`/stats/coordinates`)
  var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Less 20 years", "Between 20 and 30 years", "Between 30 and 40 years", "Above 40 years"],
        datasets: [
          {
            label: "Age (years)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: [2478,5267,734,7824]
          }
        ]
      },
    options: {
      title: {
        display: true,
        text: 'Users Age'
      }
    }
});
}
