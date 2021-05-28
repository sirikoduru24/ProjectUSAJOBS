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
                    <tr>
                        <td>{elem.state}</td>
                        <td>{elem.jobCount}</td>
                        <td>{elem.minRem}</td>
                        <td>{elem.maxRem}</td>
                    </tr>
                )
            })
            return rows
        }
    }
    return (
        <table class = "place">
            <thead>
                <tr>
                    <th scope="col">State</th>
                    <th scope="col">Number of Jobs</th>
                    <th scope="col">Minimum Salary</th>
                    <th scope="col">Maximum Salary</th>
                </tr>
            </thead>
            <tbody>{renderJobsData()}</tbody>
        </table>
    )
}

export default ShowTableData;
