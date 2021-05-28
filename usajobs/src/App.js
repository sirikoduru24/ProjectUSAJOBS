import './App.css';
import Map from "./Components/Map.js";
import jobsData from "./API/jobsData"
import { useEffect, useState } from 'react';
import mapData from './API/mapData';
import ShowTableData from "./Components/showTableData"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LineChart from "./Components/Chart2";
import Houses from "./Components/Chart1";
import Fields from "./Components/statistics";
import StateData from "./Components/StateData"; 
import FilterForStateMaps from "./Components/FilterForStateMaps"
import Donut from "./Components/DonutChart"
function App() {

  const [jobData,setJobsData] = useState()
  const [mapsData,setMapsData] = useState()
  const [jobTypeData, setJobTypeData] = useState()
  const [allStatesData, setAllStatesData] = useState()
  const [filterData,setFilterData] = useState()
  const [groupedByStates,setGroupedByStates] = useState()
  const [groupedByCities, setGroupByCities] = useState()
  const [selectedStateCityName, setselectedStateCityNames] = useState()
  const [selectedStateCityJobs,setselectedStateCityJobs] = useState()

  useEffect( () => {
    const getJobsData = async () => {
      const data1 = await jobsData('Page=1&ResultsPerPage=1000')
      const data2 = await jobsData('Page=2&ResultsPerPage=1000')
      const data3 = await jobsData('Page=3&ResultsPerPage=1000')
      let res = data1.concat(data2,data3)
      console.log(res)
      setJobsData(res)
    }
    getJobsData()
  },[])

  useEffect( () => {
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
        console.log(byStates)
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
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand"><h1 className="links">JOBS DASHBOARD</h1></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarMd">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="collapsingNavbarMd">
        <ul class="navbar-nav">
          <li class="nav-item">
              <a class="nav-link" href="/home"><h4 className="links text-dark">NATION WIDE JOBS DATA</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/stateMaps"><h4 className="links text-dark">STATE WIDE JOBS DATA</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/search"><h4 className="links text-dark">SEARCH</h4></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/houses"><h4 className="links text-dark">STATISTICS</h4></a>
          </li>
      </ul>
  </div>
</nav>
<Switch>
        <Route path="/home">
          <div class = "container-fluid">
            <div class = "row">
              <div class = "col-7">
                <Map mapdata = {mapsData} jobdata = {jobData}/>
              </div>
              <div class = "col-5 tableFloat">
                <ShowTableData jobdata = {jobData}/>
              </div> 
            </div>
          </div>
        </Route>
        <Route path="/search">
          <ShowTableData jobdata = {jobData}/>
        </Route>
        <Route path = "/stateMaps">
          <div class = "container-fluid">
          <div class = "row">
            <FilterForStateMaps setFilterData = {(fd) => setFilterData(fd)} statedata = {allStatesData}></FilterForStateMaps>
          </div>
          <div class = "row">
            <div class = "col-md-5">
              {(filterData && selectedStateCityName) && (
                <Donut citiesData = {selectedStateCityName} jobCount = {selectedStateCityJobs}>
                </Donut>)}
            </div>
            <div class = 'col-md-7'>
            {filterData && (
            <StateData citiesData = {groupedByCities}></StateData>
          )}
            </div>
          </div>
          </div>
        </Route>
        <Route path="/houses">
        <div><Houses></Houses></div>
        <div><LineChart></LineChart></div>
        <div><Fields></Fields></div>
        </Route>
      </Switch>
    </div>
  </Router>
 );
}

export default App;