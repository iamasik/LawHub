google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Revenue', 'Net Income', 'Profit'],
          ['2020', 1000, 400, 200],
          ['2021', 1170, 460, 250],
          ['2022', 660, 1120, 300],
          ['2023', 1030, 540, 350]
        ]);

        var options = {
          chart: {
            title: 'User Performance',
            subtitle: 'Revenue, Net Income, and Profit: 2020-2023',
          },
          bars: 'vertical',
          vAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

        var btns = document.getElementById('btn-group');

        btns.onclick = function (e) {

          if (e.target.tagName === 'BUTTON') {
            options.vAxis.format = e.target.id === 'none' ? '' : e.target.id;
            chart.draw(data, google.charts.Bar.convertOptions(options));
          }
        }
      }