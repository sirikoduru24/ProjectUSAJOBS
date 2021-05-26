import './App.css';
import Map from "./Components/Map.js";
import jobsData from "./API/jobsData"
import { useEffect, useState } from 'react';
import mapData from './API/mapData';
import ShowTableData from "./Components/showTableData"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  const [jobData,setJobsData] = useState()
  const [mapsData,setMapsData] = useState()
  const [jobTypeData, setJobTypeData] = useState()

  useEffect( () => {
    const getJobsData = async () => {
      const data1 = await jobsData('Page=1&ResultsPerPage=100')
      const data2 = await jobsData('Page=2&ResultsPerPage=100')
      const data3 = await jobsData('Page=3&ResultsPerPage=100')
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
      const data = await mapData()
      setMapsData(data)
    }
    getMapsData()
  },[])
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
              <div class = "col-8">
                <Map mapdata = {mapsData} jobdata = {jobData}/>
              </div>
              <div class = "col-4 tableFloat">
                <ShowTableData jobdata = {jobData}/>
              </div> 
            </div>
          </div>
        </Route>
        <Route path="/search">
          <ShowTableData jobdata = {jobData} typedata = {jobTypeData}/>
        </Route>
        <Route path="/houses">
          <ShowTableData jobdata = {jobData} />
        </Route>
      </Switch>
    </div>
  </Router>
 );
}

export default App;