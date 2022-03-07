import './JobTime.css';
import React from "react";
import {Bar} from "react-chartjs-2";
  
const styles = {
  height:'600px',
  width: '600px'
}

/**
 * The  Fields function is used to export a bar graph which reflects from job timings
 * param {*} props 
 * returns Bar Component
 */

function Fields(props) {

  const options = {
    legend: {
      align: "bottom",
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#fff",
        fontSize: 28
      }
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    tooltips: {
      mode: "label",
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 28,
    },
}
  /**
   * displayJobTime()
   * The function displayJobTime() gets the job type data from app.js file and 
   * it uses props, saves data as state and count of part time
   * jobs and full time jobs, and displays in Bar graph
   * returns Bar Graph
   */

  const displayJobTime = () => {
    if(props.jobTypeData) {

      let stateData = props.jobTypeData
      const stateName=[]
      const FullTimeCount=[]
      const PartTimeCount=[]
      
      for(let i=0; i<stateData.length; i++){
        stateName.push(stateData[i].state)
        FullTimeCount.push(stateData[i].FullTime)
        PartTimeCount.push(stateData[i].PartTime)
      }

      const data = {
          labels: stateName,
          datasets: [
            {
              label: "Full Time",
              data: FullTimeCount,
              fill: false,
              backgroundColor: "magenta",
              borderColor: "red",
              
            },
            {
              label: "Part Time",
              data: PartTimeCount,
              fill: false,
              backgroundColor: "green",
              borderColor: "pink",
              
            }
          ]
      }
      return(<div><Bar  className="PartFullDiv" data={data} options={options} legend={legend} width={500} height={500}
      ></Bar></div>)
    }
  }

  return (
    <div class = "col-md-6" style = {styles}>
      {displayJobTime()}
    </div>
  );
}

export default Fields;