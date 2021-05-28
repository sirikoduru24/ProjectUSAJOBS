import './JobTime.css';
import React from "react";
import {Bar} from "react-chartjs-2";
  
  
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
    maintainAspectRatio: true,
  };
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 28,
    },
}

  const displayJobTime = () => {
    if(props.jobTypeData) {
      console.log("Rucha jobTypeData: ", props.jobTypeData)
      let stateData = props.jobTypeData
      console.log("Rucha : ", stateData)
      const stateName=[]
      const FTcount=[]
      const PTcount=[]
      for(let i=0; i<stateData.length; i++){
        stateName.push(stateData[i].state)
        FTcount.push(stateData[i].FullTime)
        PTcount.push(stateData[i].PartTime)
      }
      console.log("Hey There! ", stateName, FTcount, PTcount)
      const data = {
          labels: stateName,
          datasets: [
            {
              label: "Full Time",
              data: FTcount,
              fill: false,
              backgroundColor: "magenta",
              borderColor: "red",
              
            },
            {
              label: "Part Time",
              data: PTcount,
              fill: false,
              backgroundColor: "green",
              borderColor: "pink",
              
            }
          ]
      }
      return(<div><Bar  className="PartFullDiv" data={data} options={options} legend={legend}></Bar></div>)
    }
  }

  return (
    <div>
      {displayJobTime()}
    </div>
  );
}
export default Fields;