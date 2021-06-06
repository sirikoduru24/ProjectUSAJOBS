/*
This function is for returning the Maps as a highchart. So here we take the Maps data from the API,
join all the states using postal code, give all the options for the map and then return it.
The map data is got from App.js.
On hovering over each state of the map we display the job count.
To do this we get the jobs data from the usajobs API from App.js and for each state 
we get the count of jobs, that count is displayed on hovering over each state.
 */
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);

function Maps(props) {
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
  const renderMapsData = () => {
    if(props.mapdata && props.jobdata) {
      options.series[0].data = [];
      options["chart"]["map"] = props.mapdata.data;
      let x = props.jobdata
          let dataDict = []
          x.forEach(element => {
            let k = {}
            k['countryCode'] = element.locations
              dataDict.push(k)
          });
          const items = dataDict.reduce((total, item) => {
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