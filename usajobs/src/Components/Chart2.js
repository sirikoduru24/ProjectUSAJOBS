import React from "react";
import { Line } from "react-chartjs-2";

const styles = {
  height: "600px",
  width: "600px"
}
/**
 * Function LineChart returns the Line chart which compares the minimum and maximum 
   remuneration of job based of the each states.
   The data is taken from USAjobs API and the required array is obtained from app.js
 * @param {*} props 
 * @returns 
 */
export default function LineChart(props) {
  const renderJobsData = () => {
    if(props.jobdata) {
      let stateArray=[]
      let minRemunerations = []
      let maxRemunerations = []
      props.jobdata.forEach(element => {
        stateArray.push(element.state)
        minRemunerations.push(element.minimumRemuneration)
        maxRemunerations.push(element.maximumRemuneration)
      });
    
    const data = {
      labels: stateArray,
      datasets: [{
        label: "Max Salary",
        data: maxRemunerations,
        fill: false,
        backgroundColor: "rgb(252, 70, 26)",
        borderColor: "rgba(252, 70, 26, 0.5)",    
      },
      {
        label: "Min Salary",
        data: minRemunerations,
        fill: false,
        backgroundColor: "rgb(0, 109, 140)",
        borderColor: "rgba(0, 109, 140, 0.5)",
      }]};

    const legend = {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: "#323130",
        fontSize: 14,
      },
    };
    
    const options = {
      legend: {
        labels: {
          fontColor:'blue'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        },
        ],
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 180,
            minRotation: 180
          }
        }],
      },
      tooltips: {},
      responsive: true,
      maintainAspectRatio: false,
      };
    
      return (
        <Line  data={data} legend={legend} options={options} width={500} height={500} ></Line>
      );}}
      
      return <div class = "col-md-6" style={styles}> {renderJobsData()} </div>
  }