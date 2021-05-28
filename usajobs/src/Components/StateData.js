import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/collapse.js";
import { Table } from "react-bootstrap";
import "./StateData.css"

function StateData(props) {
    const displayStateData = () => {
            const renderStateData = () => {
                if(props.citiesData) {
                    console.log(props.citiesData)
                    const results = () => {
                    let res = []
                    let index = 0
                    for(const [key,value] of Object.entries(props.citiesData)) {
                        let valueDiv = []
                        index++ 
                        let className = ".multi-collapse"+index
                        let className1 = "collapse multi-collapse"+index
                        let controls = ".multiCollapseExample"+index
                        value.forEach((elem) => {
                            const title = elem['positionTitle']
                            const url = elem['applyUrl']
                            const date = elem['CloseDate']
                            valueDiv.push(
                                <tr><td>{title}</td><td>{date}</td><td>{url}</td></tr>)
                        })    
                          res.push(<tr
                            data-toggle="collapse"
                            data-target={className}
                            aria-controls={controls}>
                            <td>{key} </td>
                            <td>{value.length}</td>
                            </tr>
                            )
                    res.push(<div class= {className1} id={controls}><table class = "styles">
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Apply Link</th>
                            </tr>
                        </thead>
                        <tbody>{valueDiv}</tbody>
                    </table></div>)
                }   
                    return res;
                    }
                    return (
                        <table class = "styles">
                            <thead>
                                <tr id = 't01'>
                                    <th>Name Of The City</th>
                                    <th>Number Of Jobs </th>
                                </tr>    
                            </thead>
                            <tbody>
                                {results()}
                            </tbody>
                        </table>
                    )
                         
                }
               
        }
            return(
            renderStateData()
        )
    }
    return (
        <div>{displayStateData()}</div>        
    )
}
    
export default StateData;