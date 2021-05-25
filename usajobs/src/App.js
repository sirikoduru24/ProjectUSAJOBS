import './App.css';
import Map from "./Components/Map.js";
import jobsData from "./API/jobsData"
import { useEffect, useState } from 'react';
import mapData from './API/mapData';

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
    <div className = "App">
      <Map></Map>
    </div>
  );
}

export default App;