import './publicJobs.css';
import React from "react";
import {Bar} from "react-chartjs-2";
  
const styles = {
  height:'600px',
  width: '600px'
}

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
      const Pcount=[]

      for(let i=0; i<stateData.length; i++){
        stateName.push(stateData[i].state)
        Pcount.push(stateData[i].PublicJobs)
      }
      console.log("Hey There! ", stateName, Pcount)
      const data = {
          labels: stateName,
          datasets: [
            {
              label: "Public",
              data: Pcount,
              fill: false,
              backgroundColor: "aqua",
              borderColor: "red",
              
            }
          ]
      }
      return(<Bar  className="PubJobDiv" data={data} options={options} legend={legend} width={500} height={500}></Bar>
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