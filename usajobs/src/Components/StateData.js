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
                            //const url = elem['applyUrl']
                            const date = elem['CloseDate']
                            valueDiv.push(
                                <tr className="cityRows"><td className="cityCol">{title}</td><td className="cityCol">{date}</td></tr>)
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
                            <th>Application Close Date</th>
                            </tr>
                        </thead>
                        <tbody>{valueDiv}</tbody>
                    </table></div>)
                }   
                    return res;
                    }
                    let arr = [<thead><tr id = 't01'>
                    <th>Name Of The City</th>
                    <th>Number Of Jobs </th>
                </tr></thead>]
                arr.push(<tbody>{results()}</tbody>)
                    return arr
                         
                }
               
        }
            return(
            renderStateData()
        )
    }
    return (
            <table class = "styles ">
                {displayStateData()}
            </table>
    )
}
    
export default StateData;