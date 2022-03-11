import React from "react";
import { Pie } from "react-chartjs-2";

const backgroundColors = [
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

const borderColors = [
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
  position: 'bottom',
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};

const options = {
  title: {
    display: true
  },
  responsive: true,
  maintainAspectRatio: false,
};

const styles = {
  height: "500px",
  width: "500px"
}

/**
 * Function Houses returns the Pie chart which shows the job fields according  
  to the numbers in the USA 
  The data is taken from USAjobs API and the required array is obtained from app.js
 * @param {*} props 
 * @returns 
 */

export default function Houses(props) {
  const renderFieldData = () =>{
    if(props.jobdata) {
      let fieldCountArray=[]
      let fieldNameArray=[]
      props.jobdata.forEach(element => {
        fieldCountArray.push(element.Field1)
        fieldCountArray.push(element.Field2)
        fieldCountArray.push(element.Field3)
        fieldCountArray.push(element.Field4)
        fieldCountArray.push(element.Field5)
        fieldCountArray.push(element.Field6)
        fieldCountArray.push(element.Field7)
        fieldCountArray.push(element.Field8)
      
        fieldNameArray.push(element.FieldName1)
        fieldNameArray.push(element.FieldName2)
        fieldNameArray.push(element.FieldName3)
        fieldNameArray.push(element.FieldName4)
        fieldNameArray.push(element.FieldName5)
        fieldNameArray.push(element.FieldName6)
        fieldNameArray.push(element.FieldName7)
        fieldNameArray.push(element.FieldName8)
      });

      const data = {
        labels: fieldNameArray,
        datasets: [{
          data: fieldCountArray,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      };
  
      return (
      <Pie data={data} legend={legend} options={options} height = {500} width = {500}/>
      );
      }
    }
    return <div class = "col-md-6"style={styles}> {renderFieldData()} </div>
  }