import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "./Styling/Charts.css";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barOptions: {
        chart: {
          id: 'basic-bar',
          type: 'bar',
          height: 350,
          width: 500,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT',
            '01/02/2011 GMT',
            '01/03/2011 GMT',
            '01/04/2011 GMT',
            '01/05/2011 GMT',
            '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      barSeries: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      donutOptions: {
        chart: {
          id: 'donut-chart',
          type: 'donut',
          width: '100%',
          height: '500px',
          toolbar: {
            show: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
                height: '300px'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ],
        series: [44, 55, 41, 17, 15],
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5']
      },
      areaOptions: {
        chart: {
          id: 'area-chart',
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            }
          },
          title: {
            text: 'Price'
          }
        }
      },
      areaSeries: [
        {
          name: 'XYZ MOTORS',
          data: [30, 40, 35, 50, 49, 62, 70]
        }
      ]
    };
  }

  render() {
    return (
      <div className="chart-container">
            {/* Last 7 day history of each category */}
        <div className="bar-chart">
          <ReactApexChart
            options={this.state.barOptions}
            series={this.state.barSeries}
            type="bar"
            height={350}
          />
        </div>

        <div className="donut-chart">
            {/* Historyy of time spent on each category */}
          <ReactApexChart
            options={this.state.donutOptions}
            series={this.state.donutOptions.series}
            type="donut"
          />
        </div>

        <div className="area-chart">
            {/* 7 day history of total time spent */}
          <ReactApexChart
            options={this.state.areaOptions}
            series={this.state.areaSeries}
            type="area"
          />
        </div>
      </div>
    );
  }
}

export default ChartComponent;
