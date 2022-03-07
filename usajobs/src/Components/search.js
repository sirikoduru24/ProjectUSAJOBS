import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css'

/* 
When the user clicks on the job information row which is returned by function Search
then the function showDetails displays all the details related to the clicked job row.
 */
function showDetails(elem){

    document.querySelector("#ltitle").textContent="Job Title : "
    document.querySelector("#lvtitle").textContent=elem['positionTitle']

    document.querySelector("#lcity").textContent="Location : "
    document.querySelector("#lvcity").textContent=elem['cityName']

    document.querySelector("#lsummary").textContent="Summary : "
    document.querySelector("#lvsummary").textContent=elem['summary']

    document.querySelector("#lduties").textContent="Major Duties : "
    document.querySelector("#lvduties").textContent=elem['duties']

    document.querySelector("#ltime").textContent="Job Time : "

    if(elem['jobType']==="1"){
        document.querySelector("#lvtime").textContent="Full Time"
    }
    else{
        document.querySelector("#lvtime").textContent="Part Time"
    }

    document.querySelector("#lsalary").textContent="Salary : "
    document.querySelector("#lvsalary").textContent=elem.remuneration.MinimumRange+" - "+elem.remuneration.MaximumRange

    document.querySelector("#lcdate").textContent="Apply Before Date : "
    document.querySelector("#lvcdate").textContent=elem['CloseDate']

    document.querySelector("#lurl").textContent="Apply Here : "
    document.querySelector("#lvurl").textContent=elem['applyUrl']
    document.getElementById("lvurl").href=elem['applyUrl']

}

/* Function Search take the filterData inputs given by the user and displays 
    the jobs which fits with the filterData inputs.
    The function has multiple error handling for the filters. */

function Search(props) {

    const displayStateData = () => {
    if(props.jobData){
    const filterData = props.searchFilterData
    const jobData = props.jobData
    const filterNamesData=Object.keys(filterData)

    const searchResult = []
    
    jobData.forEach(job => {

        if((filterData.state !== "None") && (job.locations === filterData.state)){
                  if(filterNamesData.includes("minSalary")) { 
                    if(Number(job.remuneration.MinimumRange) >= Number(filterData.minSalary)) {
                        if(filterNamesData.includes("maxSalary")){
                            if(Number(job.remuneration.MaximumRange) <= Number(filterData.maxSalary)){
                                        if(filterNamesData.includes("field")){
                                            if(filterData.field === "Military Services"){
                                                if(job.positionTitle.includes("Military")){
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }

                                                    
                                                }
                                            }  
                                            else if(filterData.field === "Medical Services"){
                                                if(job.positionTitle.includes("Medicine") || job.positionTitle.includes("Nurse")){
                                                    
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }
                                                }
                                            }  
                                            else if(filterData.field === "Finance and Accounting"){
                                                if(job.positionTitle.includes("Accounting") || job.positionTitle.includes("Finance") || job.positionTitle.includes("Financial")){
                                                    
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filterData.field === "Engineering"){
                                                if(job.positionTitle.includes("IT") || job.positionTitle.includes("Engineer") || job.positionTitle.includes("Engineering") ){
                                                    
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filterData.field === "Food Industry"){
                                                if(job.positionTitle.includes("Cook") || job.positionTitle.includes("Food")){
                                                    
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }
                                                }
                                            } 
                                            else if(filterData.field === "Other Fields"){
                                                if(job.positionTitle.includes("Cook") || job.positionTitle.includes("Food") || job.positionTitle.includes("IT") || job.positionTitle.includes("Engineer") || job.positionTitle.includes("Engineering") || 
                                                job.positionTitle.includes("Accounting") || job.positionTitle.includes("Finance") || job.positionTitle.includes("Financial") ||
                                                job.positionTitle.includes("Medicine") || job.positionTitle.includes("Nurse") || job.positionTitle.includes("Military")){
                                                    
                                                }
                                                else
                                                {
                                                    if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                        if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                            searchResult.push(job);
                                                        }
                                                        if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                            searchResult.push(job);
                                                        } 

                                                    }
                                                    else{
                                                        searchResult.push(job); 
                                                    }
                                                }
                                            }
                                            else{
                                                if(filterNamesData.includes("fullTime") || filterNamesData.includes("partTime")){
                                                    if((filterNamesData.includes("fullTime")) && (job.jobType==="1")){
                                                        searchResult.push(job);
                                                    }
                                                    if(filterNamesData.includes("partTime") && (job.jobType==="2")){
                                                        searchResult.push(job);
                                                    } 

                                                }
                                                else{
                                                    searchResult.push(job); 
                                                }
                                            } 

                                         }            
                                        
                                  
                                else
                                {
                                    searchResult.push(job)
                                                
                                }
                            }
                        }
                    }
                }
                
            }
        
    });
    
    let valueDiv = []
    searchResult.forEach(elem => { 
        const title = elem['positionTitle']
        const city = elem['cityName']
        const date = elem['CloseDate']
        const url = elem['applyUrl']
        valueDiv.push(
          <tr className="searchRows" onClick={() => showDetails(elem)}><td className="searchCol">{title}</td><td className="searchCol">{city}</td><td className="searchCol"><a href={url}>Apply Link</a></td><td className="searchCol">{date}</td></tr>
            )
     
    })
    
    return valueDiv
    }
}
    
                   

    return(
        <div className="tableDetails container-fluid" >
            <div className="row">
                <div className="searchTable col-md-4">
                    <table className = "srTb">
                        <thead>
                            <tr>
                            <th className="col">Title</th>
                            <th className="col">City</th>
                            <th className="col">Apply Link</th>
                            <th className="col">Date</th>
                            </tr>
                        </thead>    
                        <tbody className="displayed" id="tableId">{displayStateData()} </tbody>
                    </table>
                </div>
                
                <div className="Details col-md-8 col-sm-12 col-xs-12">
                    <div>
                        <div className="row">
                            <label className="labelsK" for="htitle" id="ltitle"></label>
                            <label className="labelsV" for="vtitle" id="lvtitle"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hcity" id="lcity"></label>
                            <label className="labelsV" for="vcity" id="lvcity"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="htime" id="ltime"></label>
                            <label className="labelsV" for="vtime" id="lvtime"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hsalary" id="lsalary"></label>
                            <label className="labelsV" for="vsalary" id="lvsalary"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hcdate" id="lcdate"></label>
                            <label className="labelsV" for="vcdate" id="lvcdate"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hsummary" id="lsummary"></label>
                            <label className="labelsV" for="vsummary" id="lvsummary"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hduties" id="lduties"></label>
                            <label className="labelsV" for="vsuties" id="lvduties"></label>
                        </div>
                        <div className="row">
                            <label className="labelsK" for="hurl" id="lurl"></label>
                            <a className="labelsVurl" for="vurl" id="lvurl"></a>
                        </div>
                    </div>               
                </div>
            </div>
        </div>
    )
}

export default Search;

