function getSelectedValue(props) {
    let filters = {}
    let state = document.getElementById("statedd").value;
    let minSalary = document.getElementById("minsalary").value;
    let maxSalary = document.getElementById("maxsalary").value;
    console.log("Selected State: ",state,minSalary, maxSalary)
    filters['state']=state;
    filters['minSalary']=minSalary;
    filters['maxSalary']=maxSalary;
    props.setSearchFilterData(filters)
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
        <input type="number" id="minsalary" step="500"/>
        <input type="number" id="maxsalary" step="500"/>
        <button id="applyBtn" onClick={getSelectedValue}>Apply</button>
    </div>
    )
}
export default FilterForSearch

/*<button id="applyBtn" onClick = {(e) => props.setSearchFilterData(e.target.value)}>Apply</button>*/