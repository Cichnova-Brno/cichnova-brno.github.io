function print_graph(xvalues, yvalues, max, jump){

  window.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('data').getContext('2d')
    const barColors = '#999999'
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: xvalues,
        datasets: [{
          backgroundColor: barColors,
          data: yvalues
        }]
      },

      options: {
        legend: {
          display: false
        },
          
        elements: {
          rectangle: {
            borderRadius: 10
          }  
        },

        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: max,
              stepSize: jump
            }
          }]
        },

        tooltips: {
            enabled: false
        }
      }
    })
  })
}
print_graph()
