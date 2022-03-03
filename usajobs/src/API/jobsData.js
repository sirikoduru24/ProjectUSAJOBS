/**
 * getData() function fetches data from api.
 * Reads json data and store required fields in dictionary.
 * @param {*} extension 
 * @returns allJobs[]
 */
export default async function getData(extension) {
  var allJobs = []
  var apiData = {}
  const baseURL = 'https://data.usajobs.gov/api/Search?'

  try {
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
      apiData[key] = value
    }
    let searchResults = apiData.SearchResult.SearchResultItems
    searchResults.forEach(element => {
      let job = {}
      job['positionTitle'] = element.MatchedObjectDescriptor.PositionTitle
      job['applyUrl'] = element.MatchedObjectDescriptor.PositionURI
      if(element.MatchedObjectDescriptor.PositionLocation[0] !== undefined) {
        job['cityName'] = element.MatchedObjectDescriptor.PositionLocation[0]['CityName']
        job['locations'] =  element.MatchedObjectDescriptor.PositionLocation[0]['CountrySubDivisionCode']
      }
      job['remuneration'] = element.MatchedObjectDescriptor.PositionRemuneration[0]
      job['jobType'] = element.MatchedObjectDescriptor.PositionSchedule[0]['Code']
      job['CloseDate'] = element.MatchedObjectDescriptor.ApplicationCloseDate
      job['hiringPath'] = element.MatchedObjectDescriptor.UserArea.Details.HiringPath
      job['summary']=element.MatchedObjectDescriptor.UserArea.Details.JobSummary
      job['duties']=element.MatchedObjectDescriptor.UserArea.Details.MajorDuties
      
      allJobs.push(job)
    });
  return allJobs;
  } catch {
    console.error("Error fetching data");
  }
}