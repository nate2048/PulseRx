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

const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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

class Graphs extends React.Component {
    constructor(props){
        super(props)
        this.state = {graph : 0}
        this.graph0 = this.graph0.bind(this)
        this.graph1 = this.graph1.bind(this)
        this.graph2 = this.graph2.bind(this)
    }
    graph0(){
        this.setState({graph : 0})
    }
    graph1(){
        this.setState({graph : 1})
    }
    graph2(){
        this.setState({graph : 2})
    }

    render(){
        const isgraph = this.state.graph; 
        let graph; 
        if(isgraph == 0){
            graph = <div> EXAMPLE GRAPH, LET ME KNOW WHEN YOU FIGURE OUT HOW TO INPUT THE DATA <Chart {...chartConfig}/></div>;
        } else if (isgraph == 1) {
            graph = <div> graph1 </div>;
        } else if (isgraph == 2) {
            graph = <div> graph2, etc. </div>;
        }
        return(
            <div>
                {graph}
                <div class="p-8 space-x-3">
                    <Button onClick={this.graph0}> Graph0 </Button>
                    <Button onClick={this.graph1}> Graph1 </Button>
                    <Button onClick={this.graph2}> Graph2 </Button>
                </div>
            </div>
        )
    }
}
export default Graphs;