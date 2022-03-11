import './publicJobs.css';
import React from "react";
import { Bar } from "react-chartjs-2";
  
const styles = {
  height:'600px',
  width: '600px'
}
/**
 * This function takes input from hiringPath data,
 * sent from the app.js using props, and store data 
 * as state and respective count of total number 
 * of public hiring jobs and display Bar Graph 
 * param {*} props 
 * returns Bar component
 * @param {*} props (hiringPath data)
 * @returns <Bar> element
 */
function PublicJobs(props) {
  const options = {
    legend: {
      align: "bottom",
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#ffffff",
        fontSize: 28
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
        display: false
        }
      }]
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
      fontColor: "#ffffff",
      fontSize: 28,
    },
}

  const displayPublicJobs = () => {
    if(props.hiringPaths) {
      let stateData = props.hiringPaths
      const stateName=[]
      const publicJobsCount=[]

      for(const i=0; i<stateData.length; i++){
        stateName.push(stateData[i].state)
        publicJobsCount.push(stateData[i].PublicJobs)
      }
      const data = {
          labels: stateName,
          datasets: [
            {
              label: "Public Hiring Path",
              data: publicJobsCount,
              fill: false,
              backgroundColor: "aqua",
              borderColor: "red",
              
            }
          ]
      }
      return(<Bar  className="publicJobDiv" data={data} options={options} legend={legend} width={500} height={500}></Bar>
      )
      
    }
  }

  return (
    <div class = "col-md-6" style = {styles}>
      {displayPublicJobs()}
    </div>
  );
}
export default PublicJobs;