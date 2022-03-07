/*
The function ShowTableData in this file will display all the data for 
1. State names
2. Job count in the respective State
3. Minimum and the maximum remuneration for the each State.

The data is gathered from the API USAJobs. The app.js returns the needed jobs array.
After the data is returned, the job count for each state is calculated by grouping the state.
Finally, it counts the maximum and minimum remuneration for each state.
*/

import React from "react";
    
function ShowTableData(props) {

    const renderJobsData = () => {
        if(props.jobdata) {
            let data = props.jobdata;
            let jobsCountArray = []
            data.forEach(element => {
                    let storeData = {}
                    storeData['countryCode'] = element.locations
                    let maxRemuneration = parseFloat(element.remuneration.MaximumRange)
                    let minRemuneration = parseFloat(element.remuneration.MinimumRange)
                    if(element.remuneration.RateIntervalCode === "Per Hour") {
                        minRemuneration = minRemuneration*8*30*12
                        maxRemuneration = maxRemuneration*8*30*12
                    }
                    storeData['minRemuneration'] = Math.floor(minRemuneration)
                    storeData['maxRemuneration'] = Math.floor(maxRemuneration)
                    jobsCountArray.push(storeData)
            });
            
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                  (result[currentValue[key]] = result[currentValue[key]] || []).push(
                    currentValue
                  );
                  return result;
                }, {});
              };
              
            const groupByCity = groupBy(jobsCountArray, 'countryCode');
            let finalArray = []
            for(const [key,value] of Object.entries(groupByCity)) {
                let min = 1000000, max = 0
                value.forEach(elem => {
                    if(min > elem.minRemuneration) {
                        min = elem.minRemuneration
                    }
                    if(max < elem.maxRemuneration) {
                        max = elem.maxRemuneration
                    }
                });
                let storeData = {}
                storeData['state'] = key
                storeData['jobCount'] = value.length
                storeData['minRemuneration'] = min
                storeData['maxRemuneration'] = max
                finalArray.push(storeData)
            }
            finalArray.sort((a, b) => (a.state > b.state) ? 1 : -1)

            const rows = finalArray.map((elem) => {
                return(
                    <tr className="tbRows">
                        <td className="tbCol">{elem.state}</td>
                        <td className="tbCol">{elem.jobCount}</td>
                        <td className="tbCol">{elem.minRemuneration}</td>
                        <td className="tbCol">{elem.maxRemuneration}</td>
                    </tr>
                )
            })
            return rows
        }
    }
    
    return (
        <div>
            {props.jobdata && (<table class = "place">
            <thead>
                <tr className="tbRows">
                    <th className="tbCol">State</th>
                    <th className="tbCol">Number of Jobs</th>
                    <th className="tbCol">Minimum Salary</th>
                    <th className="tbCol">Maximum Salary</th>
                </tr>
            </thead>
            <tbody>{renderJobsData()}</tbody>
        </table>)}
        </div>
    )
}

export default ShowTableData;
