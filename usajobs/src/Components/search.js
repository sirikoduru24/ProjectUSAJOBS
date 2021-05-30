import React from "react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

function Search(props) {

    console.log(props.searchFilterData)
    console.log(props.jobData)
    const filter = props.searchFilterData
    const jobData = props.jobData
    const sd = props.jobData

    console.log(Object.keys(filter))
    const filterNames=Object.keys(filter)

    const searchList = []

    




    jobData.forEach(job => {
        if((filter.state !== "None") && (job.locations === filter.state)){
            console.log(filter.state, job.locations)
                if(filterNames.includes("minSalary")) { 
                    if(Number(job.remuneration.MinimumRange) >= Number(filter.minSalary)) {
                        if(filterNames.includes("maxSalary")){
                            if(Number(job.remuneration.MaximumRange) <= Number(filter.maxSalary)){
                                if(filterNames.includes("fullTime")){
                                    if((filter.fullTime === "Full-Time") && (job.jobType==="1")){
                                        searchList.push(job);
                                    }
                                    if(filterNames.includes("partTime")){
                                        if((filter.partTime === "Part-Time") && (job.jobType==="2")){
                                        searchList.push(job);
                                        } 
                                    }
                                }
                            }
                        }
                }
            }
        }
    });
    console.log("Filtered Jobs : ",searchList)

    return(
        <div color="white">Check Console</div>
    )
}

export default Search;


/*button class="applyfilter" onClick={applyFilterandShow(allData)}>Apply Filter</button>*/