import './App.css';
import './charts.css';
import Map from "./Components/Map.js";
import jobsData from "./API/jobsData"
import { useEffect, useState } from 'react';
import mapData from './API/mapData';
import ShowTableData from "./Components/showTableData"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LineChart from "./Components/Chart2";
import Houses from "./Components/Chart1";
import Fields from "./Components/statistics";
import StateData from "./Components/StateData"; 
import FilterForStateMaps from "./Components/FilterForStateMaps"
import Donut from "./Components/DonutChart"
import PublicJobs from "./Components/publicJobs"
import FilterForSearch from "./Components/FilterForSearch"
import Search from "./Components/search"
import Loader from "react-loader-spinner";

function App() {
  //Taking all the constants to store data
  const [jobData,setJobsData] = useState()
  const [mapsData,setMapsData] = useState()
  const [jobTypeData, setJobTypeData] = useState()

  const [allStatesData, setAllStatesData] = useState()
  const [filterData,setFilterData] = useState()
  const [groupedByStates,setGroupedByStates] = useState()
  const [groupedByCities, setGroupByCities] = useState()
  const [selectedStateCityName, setselectedStateCityNames] = useState()
  const [selectedStateCityJobs,setselectedStateCityJobs] = useState()

  const [remunerationData, setRemunerationData] = useState()
  const [fieldData1, setFieldData1] = useState()
  
  const [hiringPaths, setHiringPaths] = useState()

  const [searchFilterData,setSearchFilterData] = useState()


  useEffect( () => {
    /* This function is to get the job data from jobsData.js as an array*/
    const getJobsData = async () => {
      const data1 = await jobsData('Page=1&ResultsPerPage=1000')
      const data2 = await jobsData('Page=2&ResultsPerPage=1000')
      const data3 = await jobsData('Page=3&ResultsPerPage=1000')
      let res = data1.concat(data2,data3)
      setJobsData(res)
    }
    getJobsData()
  },[])

  useEffect( () => {
    /*This function is to get remunerations from all the jobs based on states. 
    This function returns a dictionary of state name, minimum remuneration and maximum remuneration.*/
    const getRemunerations = async () => {
      let jobsCountArray = []
      if (jobData){
      jobData.forEach(element => {
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
    dict['minRem'] = min
    dict['maxRem'] = max
    finalArr.push(dict)

      }
      setRemunerationData(finalArr)
    }}
    getRemunerations()

  },[jobData])

  
  useEffect( () => {
    /* This function is to get data according to the fields.
    Here each field is mapped with a count of number of jobs available in that field and is returned as
    an array.*/
    const getFieldData = async () => {
      if(jobData) {
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
            return result;
          }, {});
        };
        
        let result = []
        let fieldfilter = []
          let i=0
          let dict = {}
          
          let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0, count9 = 0, count10 = 0
          jobData.forEach(element => {
              if(element.positionTitle.includes("Military")) {
                count1 = count1 + 1  
                
              }
              if(element.positionTitle.includes("Medicine") || element.positionTitle.includes("Nurse")) {
                count2 = count2 + 1
              }
              if(element.positionTitle.includes("Accounting") || element.positionTitle.includes("Finance") || element.positionTitle.includes("Financial")) {
                count3 = count3 + 1
              }
              if(element.positionTitle.includes("IT") || element.positionTitle.includes("Engineer") || element.positionTitle.includes("Engineering") ) {
                count4 = count4 + 1
              }
              if(element.positionTitle.includes("Cook") || element.positionTitle.includes("Food")) {
                count5 = count5 + 1
              }
              if(element.positionTitle.includes("Attorney") || element.positionTitle.includes("Law")) {
                count6 = count6 + 1
              }
              if(element.positionTitle.includes("Teach")) {
                count7 = count7 + 1  
              }
              if(element.positionTitle.includes("Social Worker") || element.positionTitle.includes("Counselling")) {
                count8 = count8 + 1  
              }
              
          });
         
          dict['Field1'] = count1
          dict['Field2'] = count2
          dict['Field3'] = count3
          dict['Field4'] = count4
          dict['Field5'] = count5
          dict['Field6'] = count6
          dict['Field7'] = count7
          dict['Field8'] = count8
          if(count1 > 0 )
          {
            dict['FieldName1'] = "Military Services"
          }
          if(count2 > 0 )
          {
            dict['FieldName2'] = "Medical Services"
          }
          if(count3 > 0 )
          {
            dict['FieldName3'] = "Finance & Accounting"
          }
          if(count4 > 0 )
          {
            dict['FieldName4'] = "Engineering"
          }
          if(count5 > 0 )
          {
            dict['FieldName5'] = "Food Industry"
          }
          if(count6 > 0 )
          {
            dict['FieldName6'] = "Law & Justice"
          }
          if(count7 > 0 )
          {
            dict['FieldName7'] = "Teaching"
          }
          if(count8 > 0 )
          {
            dict['FieldName8'] = "Social Work"
          }
          
          result.push(dict)
        
        setFieldData1(result)
      }
    }
    getFieldData()
  },[jobData])
    
  useEffect( () => {
    /* This function is to get job by type either full time or part-time.
    Here the dictionary of statename, count of full-time and part-time jobs in that state are returned.*/
    const getJobsByType = async () => {
      if(jobData) {
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
            return result;
          }, {});
        };
        const groupByCity = groupBy(jobData, 'locations');
        let result = []
        for(const [a,b] of Object.entries(groupByCity)) {
          let dict = {}
            dict['state'] = a
          let count1 = 0, count2 = 0
          b.forEach(element => {
              if(element.jobType === "1") {
                count1 = count1 + 1
              }
              if(element.jobType === '2') {
                count2 = count2 + 1
              }
          });
          dict['FullTime'] = count1
          dict['PartTime'] = count2
          result.push(dict)
        }
        setJobTypeData(result)
      }
    }
    getJobsByType()
  },[jobData])
  
  useEffect( () => {
    const getMapsData = async () => {
      const data = await mapData("countries/us/us-all.geo.json")
      setMapsData(data)
    }
    getMapsData()
  },[])

  useEffect( () => {
    const getHiringPaths = async () => {
      if(jobData){
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
            return result;
          }, {});
        };
        const groupByState = groupBy(jobData, 'locations');
        let stateHiringPaths = []
        let pubCount=0
        for(const [state,hp] of Object.entries(groupByState)) {
          let shp = {}
          shp['state'] = state      
            hp.forEach(elem => {
              elem.hiringPath.forEach(hp => {
                if(hp==='public'){
                  pubCount=pubCount+1
                }
              })
            });
          //}
          shp['PublicJobs']  = pubCount
          stateHiringPaths.push(shp)
        }
        setHiringPaths(stateHiringPaths)
      }
    }
    getHiringPaths()
  },[jobData])
  
  useEffect( () => {
    const allStatesInfo = async () => {
      if(mapsData) {
        let data = mapsData.data
        let statesData = []
        data.features.forEach(element => {
          statesData.push(element.properties['name'])
        });
        setAllStatesData(statesData)
      }
    }
    allStatesInfo()
  },[mapsData])
  
  useEffect( () => {
    const groupByStates = () => {
      if(jobData) {
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
            return result;
          }, {});
        };
        const byStates = groupBy(jobData, 'locations');
        setGroupedByStates(byStates)
      }
    }
    groupByStates()
  },[jobData])

  useEffect( () => {
    const sortElementsByCity = () => {
      if(groupedByStates && filterData) {
        const jobs = groupedByStates[filterData]
        jobs.forEach(element => {
          let city = element.cityName.split(',')
          element.cityName = city[0]
        });  
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
            return result;
          }, {});   
        }
        let byCities = groupBy(jobs,'cityName')    
        let cityNames = []
        let jobCountPerCity = []  
        for(const [key,value] of Object.entries(byCities)) {
          cityNames.push(key)
          jobCountPerCity.push(value.length)
        }
        setselectedStateCityJobs(jobCountPerCity)
        setselectedStateCityNames(cityNames)  
        setGroupByCities(byCities)
    }
  }
    sortElementsByCity()
  },[groupedByStates,filterData])

  return (
    <Router>
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark ">
      <a class="navbar-brand inactiveLink"><h1 className="links">JOBS DASHBOARD</h1></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarMd">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="collapsingNavbarMd">
        <ul class="navbar-nav">
          <li class="nav-item">
              <a class="nav-link" href="/"><h4 className="links">NATION WIDE JOBS DATA</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/stateMaps"><h4 className="links">STATE WIDE JOBS DATA</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/search"><h4 className="links">SEARCH</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/statistics"><h4 className="links">STATISTICS</h4></a>
          </li>
      </ul>
  </div>
</nav>
<Switch>
        <Route path="/search">
          <div>
            <FilterForSearch setSearchFilterData={(allfilters) => setSearchFilterData(allfilters)} statedata={allStatesData}/>
          </div>
            <div>
            {(!jobData) && (
            <div class = "loaderProperties">
            <Loader type="Grid" color="#00BFFF" height={75} width={75} ></Loader> 
                </div>)}
            {searchFilterData && (
            <Search searchFilterData={searchFilterData} jobData={jobData}></Search>
          )}
          </div>
        </Route>
        <Route path = "/stateMaps">
          <div class = "container-fluid">
          <div class = "row">
            <FilterForStateMaps setFilterData = {(fd) => setFilterData(fd)} statedata = {allStatesData}></FilterForStateMaps>
          </div>
          {(!jobData) && (
            <div class = "loaderProperties">
            <Loader type="Grid" color="#00BFFF" height={75} width={75} ></Loader> 
                </div>)}
          <div class = "row">
            <div class = "col-md-6 donutprops">
              {(filterData && selectedStateCityName) && (
                <Donut citiesData = {selectedStateCityName} jobCount = {selectedStateCityJobs}>
                </Donut>)}
            </div>
            <div class = 'col-md-6' style={{alignContent:'center'}}>
            {filterData && (
            <StateData citiesData = {groupedByCities}></StateData>
          )}
            </div>
          </div>
          </div>
        </Route>
        <Route path="/statistics">
          <div class="row">
          {(!jobTypeData) && (
            <div class = "loaderProperties">
            <Loader type="Grid" color="#00BFFF" height={75} width={75} ></Loader> 
                </div>)}
            <Houses jobdata = {fieldData1} typedata = {jobTypeData}></Houses>
            <LineChart jobdata = {remunerationData} typedata = {jobTypeData}> </LineChart>
            <Fields jobTypeData={jobTypeData}></Fields>
            <PublicJobs hiringPaths={hiringPaths}></PublicJobs>
          </div>
        </Route>
        <Route path="/">
          <div class = "container-fluid">
            <div class = "row">
            {(!jobData) && (
            <div class = "loaderProperties">
            <Loader type="Grid" color="#00BFFF" height={75} width={75} ></Loader> 
                </div>)}
              <div class = "col-md-7">
                <Map mapdata = {mapsData} jobdata = {jobData}/>
              </div>
              <div class = "col-md-5 tableFloat">
                <ShowTableData jobdata = {jobData}/>
              </div> 
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  </Router>
 );
}

export default App;