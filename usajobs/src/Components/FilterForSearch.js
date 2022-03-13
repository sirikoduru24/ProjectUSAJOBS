import './search.css'
/**
 * getSelectedValues() reads user entered values,
 * store them as key and value and return to serach tag.
 * param : {*} props 
 * returns : filter values
 */
function getSelectedValue(props) {
    let filters = {}
    let state = document.getElementById("statedd").value;
    let minSalary = document.getElementById("minsalary").value;
    let maxSalary = document.getElementById("maxsalary").value;
    let field = document.getElementById("fielddd").value;
    let partTime = document.getElementById("part-time").value
    let fullTime = document.getElementById("full-time").value;

    filters['state']=state;
    if(state === "None"){
        return alert("State required")
    }
    if(field !== ""){
        filters['field']=field;
    }
    if(minSalary !== ""){
        filters['minSalary']=minSalary;
    }
    else
    {
        filters['minSalary']= 0 ;
    }
    if(maxSalary !== "") {
        filters['maxSalary']=maxSalary;
    }
    else{
        filters['maxSalary']= 1000000000000000;
    }
    if(document.getElementById("part-time").checked)
    {
        filters['partTime'] = partTime;
    }
    if(document.getElementById("full-time").checked)
    {
        filters['fullTime'] = fullTime;
    }
    
    return filters;
}

/**
 * clearFilters()
 * reset button will call this function 
 * and clear all user input values
 */
function clearFilters() {
    document.getElementById("statedd").value = "";
    document.getElementById("minsalary").value = "";
    document.getElementById("maxsalary").value = "";
    document.getElementById("fielddd").value = "";
    document.getElementById("part-time").checked = false;
    document.getElementById("full-time").checked = false;
}

/**
 * FilterForSearch()
 * This function displays filters, 
 * retrive state names, field values and display in dropdown,
 * user suppose to enter or select values and Apply filters.
 * param {*} props 
 * returns state names
 */
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
    <div className="search container-fluid">
        <div className="row1 row">
            <div className="col-md">
                <label className="stateddlabel" for="statedd">State: </label>
                <select className="" id="statedd" required>
                    <option value="None" selected></option>
                    {showStates()}
                </select>    
        </div>
        <div className="col-md">
            <label for="fielddd">Field:</label>
            <select id="fielddd">
                <option value="None" selected></option>
                <option value="Military Services">Military Services</option>
                <option value="Medical Services" >Medical Services</option>
                <option value="Finance and Accounting" >Finance and Accounting</option>
                <option value="Engineering" >Engineering</option>
                <option value="Food Industry" >Food Industry</option>
                <option value="Other Fields" >Other Fields</option>
            </select>
        </div>
        <div className="col-md">
            <label className="minsallabel" for="minsalary">Minimum Salary: </label>
            <input type="number" id="minsalary" step="500"/>
        </div>
        <div className="col-md">
            <label className="maxsallabel" for="maxsalary">Maximum Salary: </label>
            <input type="number" id="maxsalary" step="500"/>
        </div>
        <div className="jobTime col-md">
            <input type="checkbox" id="full-time" value="Full-Time"/>
            <label for="full-time">Full-Time</label>
            <input type="checkbox" id="part-time" value="Part-Time"/>
            <label for="part-time">Part-Time</label>
        </div>    
        <div className="btnBar col-md">
            <button id="applyBtn" onClick={() => props.setSearchFilterData(getSelectedValue())}>Apply</button>
            <button id="resetBtn" onClick={clearFilters}>Clear</button>
        </div>
        </div>
    </div>
    )
}

export default FilterForSearch