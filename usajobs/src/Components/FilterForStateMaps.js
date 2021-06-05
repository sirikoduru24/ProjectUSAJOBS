function FilterForStateMaps(props) {
    const renderFilteredData = () => {
        if(props.statedata) {
            console.log(props.statedata)
            const filterRows = props.statedata.map((elem) => {
                return <option value = {elem}>{elem}</option>
            })
        return filterRows
    }
}
    return (
    <div class = "stateLabelPadding">
        <label for="dropdown" class = "stateLabelPadding">Select State :</label>
        <select id = "dropdown" onChange = {(e) => props.setFilterData(e.target.value)}>{renderFilteredData()}
        </select>
    </div>
    )
}
export default FilterForStateMaps