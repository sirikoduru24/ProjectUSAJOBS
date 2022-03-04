import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);

/**
 * Maps() receives data from the map API,
 * joins all the states using postal code, 
 * gives all the options for the map.
 * @param props
 * @returns highchart
 */

function Maps(props) {
  /**
   * Define options for map characteristics
   */
  const options = {
    title: {
      text: "",
      style: {
        color: "#fff"
      }
    },
    chart: {
      backgroundColor: "transparent",
      type: "map",
      map: null,
      marginBottom: 60
    },
    mapNavigation: {
      enabled: true,
      enableButtons: false
    },
    credits: {
      enabled: false
    },
    colorAxis: {
      minimum: 0
    },
    tooltip: {
      pointFormatter: function () {
        return '<div> Job Count: '+this.value+'</div>'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
      floating: true,
      layout: "horizontal",
      valueDecimals: 0,
      backgroundColor:
        (Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "rgba(255, 255, 255, 0.85)"
    },
    series: [
      {
        name: "Available Jobs",
        dataLabels: {
          enabled: true,
          color: "black",
          format: "{point.postal-code}",
          style: {
            textTransform: "uppercase"
          }
        },
        tooltip: {
          ySuffix: " %"
        },
        cursor: "pointer",
        joinBy: "postal-code",
        data: [],
      }
    ]
  };
  /**
   * Method to render map
   * @returns map
   */
  const renderMapsData = () => {
    if(props.mapdata && props.jobdata) {
      options.series[0].data = [];
      options["chart"]["map"] = props.mapdata.data;
      let allJobs = props.jobdata
          let jobDict = []
          allJobs.forEach(element => {
            let job = {}
            job['countryCode'] = element.locations
              jobDict.push(job)
          });
          const items = jobDict.reduce((total, item) => {
            total.hasOwnProperty(item.countryCode)
              ? total[item.countryCode]++
              : (total[item.countryCode] = 1);
        
            return total;
          }, {});
          for (let i in props.mapdata.data["features"]) {
            let mapInfo = props.mapdata.data["features"][i];
            if (mapInfo["id"]) {
              var postalCode = mapInfo.properties["postal-code"];
              var name = mapInfo["properties"]["name"];
              var code = mapInfo["properties"]["hc-key"]
              var value = items[name];
              var row = i;
              options.series[0].data.push({
                value: value,
                name: name,
                "postal-code": postalCode,
                row: row,
                code: code
              });
            }
          }   
        return(<div>
          {options ? (
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"mapChart"}
              options={options}
            />
          ) : (
            ""
          )}
        </div>) 
    }
  }
return (
  <div>
    {renderMapsData()}
  </div>
)
}

export default Maps