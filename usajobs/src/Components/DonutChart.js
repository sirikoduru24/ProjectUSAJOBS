import React from "react";
import { Doughnut } from "react-chartjs-2";

let backgroundColors = [
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(199, 199, 199, 0.8)",
  "rgba(83, 102, 255, 0.8)",
  "rgba(40, 159, 64, 0.8)",
  "rgba(210, 199, 199, 0.8)"
];

let borderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(159, 159, 159, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 159, 64, 1)",
  "rgba(210, 199, 199, 1)"
];

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};

const options = {
  title: {
    display: true
  },
  maintainAspectRatio: false
};

const styles = {
  height: "450px",
  width: "450px",
}

/* Function StateChart returns the Donut chart which shows the job numbers 
   according to the cities of the selected State 
   The data is taken from USAjobs API and the required array is obtained from app.js */

export default function StateChart(props) {
    const prepareChart = () => {
        
        if(props) {
            console.log(props)
            const data = {
                labels: props.citiesData,
                datasets: [
                  {
                    data: props.jobCount,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                  }
                ]
              };
              return (
                <Doughnut data={data} legend={legend} options={options} style={styles}/>
            )
        }
    }
    
  return (
    <div style={styles} className="container stateChart" id="stateDoughnut">
      {prepareChart()}
    </div>
  );
}
