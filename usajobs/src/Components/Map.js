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
      minimum: 0
    },
    tooltip: {
      pointFormatter: function () {
        return '<div> Job Count: '+this.value+'</div>'
      }
    },
    legend: {
      align: "bottom",
      horizontalAlign: "left",
      x: 50,
      y: 70,
      floating: true,
      layout: "horizontal",
      valueDecimals: 0,
      backgroundColor:
        // theme
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
        point: {
          events: {
            click: function (r) {
              console.log("click - to open popup as 2nd step");
              console.log(r,this.code);
            }
          }
        }
      }
    ]
  };
  const renderMapsData = () => {
    if(props.mapdata && props.jobdata) {
      console.log(props.jobdata)
      options.series[0].data = [];
      options["chart"]["map"] = props.mapdata.data;
      let x = props.jobdata
          let dataDict = []
          x.forEach(element => {
            let k = {}
            k['countryCode'] = element.locations
              dataDict.push(k)
          });
          console.log('Data :',dataDict)
          const items = dataDict.reduce((total, item) => {
            total.hasOwnProperty(item.countryCode)
              ? total[item.countryCode]++
              : (total[item.countryCode] = 1);
        
            return total;
          }, {});
          console.log('Items:',items)
          for (let i in props.mapdata.data["features"]) {
            let mapInfo = props.mapdata.data["features"][i];
            if (mapInfo["id"]) {
              var postalCode = mapInfo.properties["postal-code"];
              var name = mapInfo["properties"]["name"];
              console.log('Name',name)
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