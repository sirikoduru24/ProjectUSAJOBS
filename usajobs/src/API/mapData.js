/* This function takes the data from highcharts maps API using axios and then returns it.*/
/**
 * mapData() function fetches data from highcharts.
 * This data is being used to display USA maps on dashboard.
 * @param extension
 * @returns chart
 */

import axios from "axios";

function  mapData(extension) {
    let baseUrl = "https://code.highcharts.com/mapdata/";
    try {
        let chart = axios.get(baseUrl + extension);
        return chart;
    } catch {
        console.error("Error fetching chart data")
    }
}

export default mapData;