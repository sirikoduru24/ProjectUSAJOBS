export default async function getData(extension) {
  var jobs = []
  var dataDict = {}
  const baseURL = 'https://data.usajobs.gov/api/Search?'
  const response = await fetch(baseURL+extension, {
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
      dict['locations'] = element.MatchedObjectDescriptor.PositionLocation[0]['CountrySubDivisionCode']
      dict['remuneration'] = element.MatchedObjectDescriptor.PositionRemuneration[0]
      dict['jobType'] = element.MatchedObjectDescriptor.PositionSchedule[0]['Code']
      jobs.push(dict)
  });
return jobs
}
