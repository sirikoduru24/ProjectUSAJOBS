import React from "react";
import { Line, Pie } from "react-chartjs-2";
export default function LineChart(props) {
    const data = {
        labels: ["state1","state2","state3","state4","state5"],
        datasets: [
          {
            label: "Max Salary",
            data: [40,80,10,40,20],
            fill: false,
            backgroundColor: "blue",
            borderColor: "red",
            
          },
          {
            label: "Min Salary",
            data: [20,30,5,10,5],
            fill: false,
            backgroundColor: "green",
            borderColor: "pink",
            
          }
        ]
      };
      const legend = {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#323130",
          fontSize: 14,
        },
    };
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        tooltips: {
          mode: "label",
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    
      return (
        <div className="container Houses">
          
          <Line data={data} legend={legend} options={options} />
        </div>
      );
}
