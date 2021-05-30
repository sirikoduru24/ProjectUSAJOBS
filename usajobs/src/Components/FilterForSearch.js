import '/Users/larrisa/ProjectUSAJOBS/usajobs/src/App.css';

function getSelectedValue(props) {
    let filters = {}
    let state = document.getElementById("statedd").value;
    let minSalary = document.getElementById("minsalary").value;
    let maxSalary = document.getElementById("maxsalary").value;
    let field = document.getElementById("fielddd").value;
    let partTime = document.getElementById("part-time").value
    let fullTime = document.getElementById("full-time").value;
    //let disabilityYes = document.getElementById("dyes").value;
    console.log("Selected Filters: ",state,minSalary, maxSalary, field, partTime, fullTime)
    filters['state']=state;
    filters['minSalary']=minSalary;
    filters['maxSalary']=maxSalary;
    //props.setSearchFilterData(filters)
    if(document.getElementById("part-time").checked)
    {
        filters['partTime'] = partTime;
    }
    if(document.getElementById("full-time").checked)
    {
        filters['fullTime'] = fullTime;
    }
    
    console.log(filters)
}

function FilterForSearch(props) {
    const showStates = () => {
        if(props.statedata) {
            const states = props.statedata.map((elem) => {
                return <option value = {elem}>{elem}</option>
            })
        return states
    }
}

    return (
    <div>
        <select id="statedd">
            <option value="None" selected></option>
            {showStates()}
        </select>
        
        <label for="fielddd">Select Field:</label>
        <select id="fielddd">
            <option value="None" selected></option>
            <option value="Military Services">Military Services</option>
            <option value="Medical Sevices" >Medical Sevices</option>
            <option value="Finance and Accounting" >Finance and Accounting</option>
            <option value="Engineering" >Engineering</option>
            <option value="Food Industry" >Food Industry</option>
            <option value="Other Fields" >Other Fields</option>
        </select>
       
        <input type="number" id="minsalary" step="500"/>
        <input type="number" id="maxsalary" step="500"/>
        <div className="trial">
        <input type="checkbox" id="full-time" value="Full-Time"/>
        <label for="full-time">Full-Time</label>
        <input type="checkbox" id="part-time" value="Part-Time"/>
        <label for="Part-time">Part-Time</label>
        </div>
        
     
    <button id="applyBtn" onClick={getSelectedValue}>Apply</button>

    </div>
    )
}
export default FilterForSearch

/*<button id="applyBtn" onClick = {(e) => props.setSearchFilterData(e.target.value)}>Apply</button>

<fieldset>
      <span className="trial">Disability:</span>
      
      <input type="radio" id="dyes" name="disable" value="dYes"/>
      <label  for="dYes">Yes</label>
      <input type="radio" id="dno" name="disable" value="dNo"/>
      <label for="dNo">No</label>
      </fieldset>

      if(document.getElementById("dyes").checked)
    {
        filters['disability']= disabilityYes
    }


*/