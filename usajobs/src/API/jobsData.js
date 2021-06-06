/* This function takes all the required data from the usajobs api using fetch.
It stores the required data into an array and returns it*/
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
      if(element.MatchedObjectDescriptor.PositionLocation[0] !== undefined) {
        dict['cityName'] = element.MatchedObjectDescriptor.PositionLocation[0]['CityName']
        dict['locations'] =  element.MatchedObjectDescriptor.PositionLocation[0]['CountrySubDivisionCode']
      }
      dict['remuneration'] = element.MatchedObjectDescriptor.PositionRemuneration[0]
      dict['jobType'] = element.MatchedObjectDescriptor.PositionSchedule[0]['Code']
      dict['CloseDate'] = element.MatchedObjectDescriptor.ApplicationCloseDate
      dict['hiringPath'] = element.MatchedObjectDescriptor.UserArea.Details.HiringPath
      dict['summary']=element.MatchedObjectDescriptor.UserArea.Details.JobSummary
      dict['duties']=element.MatchedObjectDescriptor.UserArea.Details.MajorDuties
      
      jobs.push(dict)
  });
return jobs
}