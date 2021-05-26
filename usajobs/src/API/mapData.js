import axios from "axios";

function  mapData() {
    let baseUrl = "https://code.highcharts.com/mapdata/";
    return axios.get(baseUrl + "countries/us/us-all.geo.json");
}

export default mapData;