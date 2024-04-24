import React from 'react';
import { useEffect, useState, Component} from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Chart from "react-apexcharts";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const defaultConfig = {
  type: "line",
  height: 240,
  series: [],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

function config(xdata, ydata) {
  return{
    chartConfig : {
      type: "line",
      height: 240,
      series: [
        {
          name: "Value",
          data: xdata,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            format: 'yyyy-MM-dd',
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: ydata,
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    }
  }
}

class Graphs extends React.Component {

    constructor(props){
        super(props)
        this.state = {graph : 0, data : [], config : defaultConfig}
        this.toggleMarker = this.toggleMarker.bind(this)
        this.init();
    }

    async init() {
      await this.fetchData()
    }

    async fetchData() {
      const response = await client.get("/api/markers",
          {'withCredentials': true })
          .then(res => {
            this.setState({ data: res.data });
            console.log(res.data);
          });
    }

    toggleMarker = (index, c) => {
      this.setState({graph : index, config : c})
    };

    render(){

        const data = this.state.data;
        const c = this.state.config;
        let graph = <div class=" "><Chart {...c}/></div>;

        return(
        <>
          {graph}
          {Object.entries(data).map(([markerName, markerInfo], index) => {
            var values = [];
            var dates = [];
            {markerInfo.tests.map((test, i) => {
              values.push(test.val);
              dates.push(test.test_date);
            })}
            const c = config(values, dates).chartConfig;

            return(
              <div className="inline space-x-5 pl-3 " >
                <Button onClick={() => this.toggleMarker(index, c)}> {markerName} </Button>
              </div>
            )
          })}
        </>
        )
    }
}
export default Graphs;