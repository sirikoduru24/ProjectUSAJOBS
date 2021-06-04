import React from "react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import 'bootstrap/dist/css/bootstrap.min.css';

function Search(props) {
    const displayStateData = () => {
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
                                        if(filterNames.includes("field")){
                                            if(filter.field === "Military Services"){
                                                if(job.positionTitle.includes("Military")){
                                                    console.log(job)
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }

                                                    
                                                }
                                            }  
                                            else if(filter.field === "Medical Services"){
                                                if(job.positionTitle.includes("Medicine") || job.positionTitle.includes("Nurse")){
                                                    console.log(job)
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }
                                                }
                                            }  
                                            else if(filter.field === "Finance and Accounting"){
                                                if(job.positionTitle.includes("Accounting") || job.positionTitle.includes("Finance") || job.positionTitle.includes("Financial")){
                                                    console.log(job)
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filter.field === "Engineering"){
                                                if(job.positionTitle.includes("IT") || job.positionTitle.includes("Engineer") || job.positionTitle.includes("Engineering") ){
                                                    console.log(job)
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filter.field === "Food Industry"){
                                                if(job.positionTitle.includes("Cook") || job.positionTitle.includes("Food")){
                                                    console.log(job)
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filter.field === "Other Fields"){
                                                if(job.positionTitle.includes("Cook") || job.positionTitle.includes("Food") || job.positionTitle.includes("IT") || job.positionTitle.includes("Engineer") || job.positionTitle.includes("Engineering") || 
                                                job.positionTitle.includes("Accounting") || job.positionTitle.includes("Finance") || job.positionTitle.includes("Financial") ||
                                                job.positionTitle.includes("Medicine") || job.positionTitle.includes("Nurse") || job.positionTitle.includes("Military")){
                                                    console.log("Dont get in");
                                                }
                                                else
                                                {
                                                    if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                        if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                            searchList.push(job);
                                                        }
                                                        if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                            searchList.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchList.push(job); 
                                                    }
                                                }
                                            }
                                            else{
                                                if(filterNames.includes("fullTime") || filterNames.includes("partTime")){
                                                    if((filterNames.includes("fullTime")) && (job.jobType==="1")){
                                                        searchList.push(job);
                                                    }
                                                    if(filterNames.includes("partTime") && (job.jobType==="2")){
                                                        searchList.push(job);
                                                    } 

                                                }
                                                else{
                                                    searchList.push(job); 
                                                }
                                            } 

                                         }            
                                        
                                  
                                else
                                {
                                    searchList.push(job)
                                                
                                }
                            }
                        }
                    }
                }
                
            }
        
    });
    console.log("Filtered Jobs : ",searchList)
    console.log("")
    let valueDiv = []
    searchList.forEach(elem => { 
        const title = elem['positionTitle']
        const city = elem['cityName']
        const date = elem['CloseDate']
        const url = elem['applyUrl']
        valueDiv.push(
            <tr className="searchRows"><td className="searchCol">{title}</td><td className="searchCol">{city}</td><td className="searchCol"><a href={url}>Apply Link</a></td><td className="searchCol">{date}</td></tr>
            )
     
    })
    console.log()
    
    return valueDiv
//}
    }
    
                   

    return(
        <div className="tableDetails container-flow" >
         <table class = "srTB">
                        <thead>
                            <tr>
                            <th className="col">Title</th>
                            <th className="col">City</th>
                            <th className="col">Apply Link</th>
                            <th className="col">Date</th>
                            </tr>
                        </thead>    
                    </table>
        <tbody className="displayed" id="tableId">{displayStateData()} </tbody>
        </div>
    )
}




export default Search;


/*button class="applyfilter" onClick={applyFilterandShow(allData)}>Apply Filter</button>*/