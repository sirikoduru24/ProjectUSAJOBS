import axios from "axios";

function  mapData(extension) {
    let baseUrl = "https://code.highcharts.com/mapdata/";
    return axios.get(baseUrl + extension);
}

export default mapData;