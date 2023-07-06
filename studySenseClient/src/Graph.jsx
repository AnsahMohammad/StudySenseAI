import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import "./Styling/Charts.css";

const ChartComponent = () => {
  const [barOptions] = useState({
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
  });

  const [barSeries] = useState([
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
  ]);

  const [donutOptions] = useState({
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
  });

  const [areaOptions] = useState({
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
    
  });

  const [areaSeries] = useState([
    {
      name: 'XYZ MOTORS',
      data: [30, 40, 35, 50, 49, 62, 70]
    }
  ]);

  return (
    <div className="chart-container">
      <div className="bar-chart">
        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={350}
        />
      </div>

      <div className="donut-chart">
        <ReactApexChart
          options={donutOptions}
          series={donutOptions.series}
          type="donut"
        />
      </div>

      <div className="area-chart">
        <ReactApexChart
          options={areaOptions}
          series={areaSeries}
          type="area"
        />
      </div>
    </div>
  );
};

export default ChartComponent;
