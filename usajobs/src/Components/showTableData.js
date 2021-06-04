import React from "react";
    
function ShowTableData(props) {
    const renderJobsData = () => {
        if(props.jobdata) {
            let data = props.jobdata;
            let jobsCountArray = []
            data.forEach(element => {
                    let dict = {}
                    dict['countryCode'] = element.locations
                    let maxRem = parseFloat(element.remuneration.MaximumRange)
                    let minRem = parseFloat(element.remuneration.MinimumRange)
                    if(element.remuneration.RateIntervalCode === "Per Hour") {
                        minRem = minRem*8*30*12
                        maxRem = maxRem*8*30*12
                    }
                    dict['minRem'] = Math.floor(minRem)
                    dict['maxRem'] = Math.floor(maxRem)
                    
                    jobsCountArray.push(dict)
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
            console.log('Group',groupByCity)
            let finalArr = []
            for(const [key,value] of Object.entries(groupByCity)) {
                let min = 1000000, max = 0
                value.forEach(elem => {
                    if(min > elem.minRem) {
                        min = elem.minRem
                    }
                    if(max < elem.maxRem) {
                        max = elem.maxRem
                    }
                });
                let dict = {}
                dict['state'] = key
                dict['jobCount'] = value.length
                dict['minRem'] = min
                dict['maxRem'] = max
                finalArr.push(dict)
            }
            console.log('FinalArr',finalArr)
            finalArr.sort((a, b) => (a.state > b.state) ? 1 : -1)
            const rows = finalArr.map((elem) => {
                return(
                    <tr className="tbRows">
                        <td className="tbCol">{elem.state}</td>
                        <td className="tbCol">{elem.jobCount}</td>
                        <td className="tbCol">{elem.minRem}</td>
                        <td className="tbCol">{elem.maxRem}</td>
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
