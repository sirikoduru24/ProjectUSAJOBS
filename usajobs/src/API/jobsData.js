export default async function getData() {
    var jobs = []
    var dataDict = {}
    const baseURL = 'https://data.usajobs.gov/api/Search?Page=2&ResultsPerPage=25'
    const response = await fetch(baseURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Host": 'data.usajobs.gov',          
            "User-Agent": 'larris2@pdx.edu',          
            "Authorization-Key": 'LEiaFk9ZPCJKAet/KJYUgT4TVlBoImmw8V0Fh0ZTT20='
          },
    })
    let data = await response.json();
    for (const [key, value] of Object.entries(data)) {
        dataDict[key] = value
      }
    let searchResults = dataDict.SearchResult.SearchResultItems
    searchResults.forEach(element => {
        let dict = {}
        dict['positionTitle'] = element.MatchedObjectDescriptor.PositionTitle
        dict['applyUrl'] = element.MatchedObjectDescriptor.PositionURI
        dict['locations'] = element.MatchedObjectDescriptor.PositionLocation
        dict['remuneration'] = element.MatchedObjectDescriptor.PositionRemuneration
        jobs.push(dict)
    });
    return jobs
}