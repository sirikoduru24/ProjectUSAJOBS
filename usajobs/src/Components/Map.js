import React from "react";
import mapData from "../API/mapData";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import jobsData from "../API/jobsData";

require("highcharts/modules/map")(Highcharts);

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null
    };
    // init to get the map data from api
    this.mapData = new mapData();
    //console.log(this.mapData);
    this.jobsData = jobsData();
    console.log(this.jobsData);
    this.jobsData.then(response => {
        console.log(response);
    } )
    console.log(this.jobs)
    this.options = {
      title: {
        text: "Widget click by location",
        style: {
          color: "#fff"
        }
      },
      chart: {
        backgroundColor: "transparent",
        type: "map",
        map: null
      },
      mapNavigation: {
        enabled: true,
        enableButtons: false
      },
      credits: {
        enabled: false
      },
      colorAxis: {
        dataClasses: [
          {
            from: 1,
            color: "#C40401",
            name: "widget name one"
          },
          {
            from: 2,
            color: "#0200D0",
            name: "widget name two"
          }
        ]
      },
      tooltip: {
        pointFormatter: function () {
          return this.name;
        }
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        x: -100,
        y: 70,
        floating: true,
        layout: "vertical",
        valueDecimals: 0,
        backgroundColor:
          // theme
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.backgroundColor) ||
          "rgba(255, 255, 255, 0.85)"
      },
      
    };

    
  }

  render() {
    return (
      <div>
        {this.state.mapOptions ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={this.state.mapOptions}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MyMap;
