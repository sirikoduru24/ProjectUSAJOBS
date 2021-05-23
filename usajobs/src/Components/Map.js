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
