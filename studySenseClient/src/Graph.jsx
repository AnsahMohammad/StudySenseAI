import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./Styling/Charts.css";

const ChartComponent = ({ user }) => {
  const token = user.token;

  const today = new Date();
  const dateLabels = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
    dateLabels.push(dateString);
  }

  dateLabels.reverse();

  const [barOptions] = useState({
    chart: {
      id: "basic-bar",
      type: "bar",
      height: 350,
      width: 500,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    title: {
      text: "Category share",
      align: "center",
      style: {
        fontSize: "25px",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "string",
      categories: dateLabels,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });

  const [barSeries, setBarSeries] = useState([
    {
      name: "MA101",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "CS203",
      data: [13, 23, 20, 8, 13, 27],
    },
    {
      name: "PHY712",
      data: [11, 17, 15, 15, 21, 14],
    },
    {
      name: "CHEM102",
      data: [21, 7, 25, 13, 22, 8],
    },
  ]);

  const [donutOptions, setDonutOptions] = useState({
    chart: {
      id: "donut-chart",
      type: "donut",
      width: 300,
      height: 300,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Total Time spent",
      align: "center",
      style: {
        fontSize: "25px",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "200%",
            height: "500px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    series: [30, 40, 20],
    labels: ["Chem", "MA101", "PHY203"],
  });

  const [areaOptions, setAreaOptions] = useState({
    chart: {
      id: "area-chart",
      type: "area",
      stacked: false,
      height: 350,
      width: 350,
      zoom: {
        type: "x",
        enabled: false,
        autoScaleYaxis: false,
      },
      toolbar: {
        show: false,
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Weekly timeline",
      align: "center",
      style: {
        fontSize: "25px",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "string",
      categories: dateLabels,
    },
    yaxis: {
      title: {
        text: "Time Spent (in minutes)",
      },
    },
  });

  const [areaSeries, setAreaSeries] = useState([
    {
      name: "1 Week Timeline",
      data: [30, 40, 35, 50, 49, 62, 70],
    },
  ]);

  const [funnelOptions, setFunnelOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
      style: {
        fontSize: "20px",
      },
    },
    series: {
      name: "Funnel Series",
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
    title: {
      text: "Your Top reads",
      align: "middle",
      style: {
        fontSize: "25px",
      },
    },
    xaxis: {
      categories: [],
    },
    legend: {
      show: false,
    },
    colors: [
      "#FF4560",
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#775DD0",
      "#546E7A",
      "#26A69A",
      "#D10CE8",
    ],
  });

  const [FunnelSeries, setFunnelSeries] = useState([
    {
      name: "Score",
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
  ]);

  useEffect(() => {
    fetch("https://studysense.onrender.com/data/category_history_pie/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const series = Object.values(data);
        const labels = Object.keys(data);
        setDonutOptions((prevOptions) => ({
          ...prevOptions,
          series,
          labels,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("https://studysense.onrender.com/data/timeline_data", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const timelineData = data.timeline;
        setAreaSeries([{ name: "Weekly Analysis", data: timelineData }]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("http://127.0.0.1:8000/data/category_history/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const historyData = data.history;
        const updatedSeries = Object.keys(historyData).map((category) => ({
          name: category,
          data: historyData[category],
        }));
        setBarSeries(updatedSeries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("https://studysense.onrender.com/data/top_reads/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const topReads = data.top_reads;
        setFunnelOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: topReads,
          },
        }));
        setFunnelSeries([
          {
            name: "Score",
            data: data.series,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="donut-chart">
        <ReactApexChart
          options={donutOptions}
          series={donutOptions.series}
          type="donut"
          height={550}
          width={500}
        />
      </div>

      <div className="bar-chart">
        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={350}
          width={550}
        />
      </div>

      <div className="area-chart">
        <ReactApexChart
          options={areaOptions}
          series={areaSeries}
          type="area"
          height={350}
          width={550}
        />
      </div>

      <div className="funnel-chart">
        <ReactApexChart
          options={funnelOptions}
          series={FunnelSeries}
          type="bar"
          height={350}
          width={450}
        />
      </div>
    </>
  );
};

export default ChartComponent;
