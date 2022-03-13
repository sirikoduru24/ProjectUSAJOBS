import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from 'react';

import jobsData from "./API/jobsData"
import mapData from './API/mapData';

import './App.css';
import './charts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Map from "./Components/Map.js";
import ShowTableData from "./Components/showTableData"
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
    const getJobsData = async () => {
      const dataFromPage1 = await jobsData('Page=1&ResultsPerPage=1000')
      const dataFromPage2 = await jobsData('Page=2&ResultsPerPage=1000')
      const dataFromPage3 = await jobsData('Page=3&ResultsPerPage=1000')
      const result = dataFromPage1.concat(dataFromPage2,dataFromPage3)
      setJobsData(result)
    }
    getJobsData()
  },[])

  useEffect( () => {
    const getRemunerations = async () => {
      let statesRemunerationData = []
      if (jobData){
      jobData.forEach(element => {
        let remunerationDict = {}
        
        dict['countryCode'] = element.locations
        let maxRemuneration = parseFloat(element.remuneration.MaximumRange)
        let minRemuneration = parseFloat(element.remuneration.MinimumRange)
        if(element.remuneration.RateIntervalCode === "Per Hour") {
          minRemuneration = minRem*8*30*12
          maxRemuneration = maxRem*8*30*12
        }
        remunerationDict['minRemuneration'] = Math.floor(minRemuneration)
        remunerationDict['maxRemuneration'] = Math.floor(maxRemuneration)
        statesRemunerationData.push(remunerationDict)
      });

    const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  
  const groupByCity = groupBy(statesRemunerationData, 'countryCode');
  let finalRemunerationArray = []
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
    let remunerationsDict = {}
    remunerationsDict['state'] = key
    remunerationsDict['minRemuneration'] = min
    remunerationsDict['minRemuneration'] = max
    finalRemunerationArray.push(remunerationsDict)

      }
      setRemunerationData(finalRemunerationArray)
    }}
    getRemunerations()

  },[jobData])

  
  useEffect( () => {
    /**
     * This function is to get data according to the fields.
     * Here each field is mapped with a count of number of jobs 
     * available in that field and is returned as an array.
     */
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
      let dict = {}
      let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0
      
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
      if(count1 > 0 ) {
        dict['FieldName1'] = "Military Services"
      }
      if(count2 > 0 ) {
        dict['FieldName2'] = "Medical Services"
      }
      if(count3 > 0 ) {
        dict['FieldName3'] = "Finance & Accounting"
      }
      if(count4 > 0 ) {
        dict['FieldName4'] = "Engineering"
      }
      if(count5 > 0 ) {
        dict['FieldName5'] = "Food Industry"
      }
      if(count6 > 0 ) {
        dict['FieldName6'] = "Law & Justice"
      }
      if(count7 > 0 ) {
        dict['FieldName7'] = "Teaching"
      }
      if(count8 > 0 ) {
        dict['FieldName8'] = "Social Work"
      }
      
      result.push(dict)
      setFieldData1(result)
      }
    }
    getFieldData()
  },[jobData])
    
  useEffect( () => {
    /**
     * This function is to get job by type either full time or part-time.
     * Here the dictionary of statename, count of full-time and part-time 
     * jobs in that state are returned.
     */
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
          let fullTimePartTimeJobData = {}
          fullTimePartTimeJobData['state'] = a
          let count1 = 0, count2 = 0
          b.forEach(element => {
            if(element.jobType === "1") {
              count1 = count1 + 1
            }
            if(element.jobType === '2') {
              count2 = count2 + 1
            }
          });
          fullTimePartTimeJobData['FullTime'] = count1
          fullTimePartTimeJobData['PartTime'] = count2
          result.push(fullTimePartTimeJobData)
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
          shp['PublicJobs']  = pubCount
          stateHiringPaths.push(shp)
        }
        setHiringPaths(stateHiringPaths)
      }
    }
    getHiringPaths()
  },[jobData])
  
  useEffect( () => {
    /**
     * This function gets all data from Maps and stores state names.
     */
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
    /*
    *This function works on all data 
    * and group available jobs by state names. 
    */
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
                  <Link to="/"><h4 className="links">NATION WIDE JOBS DATA</h4></Link>
              </li>
              <li class="nav-item">
                  <Link to="/stateMaps"><h4 className="links">STATE WIDE JOBS DATA</h4></Link>
              </li>
              <li class="nav-item">
                  <Link to="/search"><h4 className="links">SEARCH</h4></Link>
              </li>
              <li class="nav-item">
                  <Link to="/statistics"><h4 className="links">STATISTICS</h4></Link>
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