import React from "react";

class table extends React.Component{

    render(){
    return(
        <table className="place">
            <thead className="place">
                <caption>JOBS DATA</caption>
                <tr>
                    <th scope="col">State</th>
                    <th scope="col">Number of Jobs</th>
                    <th scope="col">Minimum Salary</th>
                    <th scope="col">Maximum Salary</th>
                    <th scope="col">Number of Full-Time Jobs</th>
                    <th scope="col">Number of Part-Time Jobs</th>
                </tr>
            </thead>
        </table>
    );
    }
};

export default table;
