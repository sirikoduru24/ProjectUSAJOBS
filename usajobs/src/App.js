import './App.css';
import Map from "./Components/Map.js";
import jobsData from "./API/jobsData"
import { useEffect, useState } from 'react';
import mapData from './API/mapData';
import Table from "./Components/table.js";


function App() {

  const [jobData,setJobsData] = useState()


  useEffect( () => {
    const getJobsData = async () => {
      const data = await jobsData()
      setJobsData(data)
    }
    getJobsData()
  },[])

  return (
    <div className = "App container">
      <div class="filter-content">
        <div class="rows">
        <div class="select-filter" id="filter1">
          <row>
            <label id="filterlabel" for="filterselect">Select Filter to see Jobs:</label>
            <select id="filterselect">
              <option value="value" selected>Apply Filters</option>
              <option value="Field">Field</option>
              <option value="Parttime">Part Time</option>
              <option value="Fulltime">Full Time</option>
              <option value="Renumeration">Salary</option>
            </select>
          </row>
        </div>
        </div>
      </div>
      <Map></Map>
      <Table className="place"></Table>

    
     
      
      

    </div>
  );
}

export default App;