import { getToken } from './authorization'
let BASE_URL = "https://test.api.amadeus.com"

export const searchFlight = async (formData) => {
    const fetchToken = await getToken()
    const token = fetchToken.access_token
    const bodyRaw = {
        "currencyCode": "IDR",
        "originDestinations": [
            {
                "id": "1",
                "originLocationCode": "BOS",
                "destinationLocationCode": "MAD",
                "departureDateTimeRange": {
                    "date": "2022-11-01",
                    "time": "00:00:00"
                }
            }
        ],
        "travelers": [],
        "sources": [
            "GDS"
        ],
        "searchCriteria": {
            "flightFilters": {
                "cabinRestrictions": [
                    {
                        "coverage": "MOST_SEGMENTS",
                        "originDestinationIds": [
                            "1"
                        ]
                    }
                ]
            }
        }
    }

    let originLocationCode = formData.origin.split('(')
    originLocationCode = originLocationCode[1].substring(0, originLocationCode.length + 1)
    let destinationLocationCode = formData.to.split('(')
    destinationLocationCode = destinationLocationCode[1].substring(0, destinationLocationCode.length + 1)
    
    for(let i = 0; i < formData.adult; i++) {
        const data = {
            "id": (i + 1).toString(),
            "travelerType": "ADULT",
            "fareOptions": [
                "STANDARD"
            ]
        }

        bodyRaw.travelers.push(data)
    }

    for(let i = 0; i < formData.child; i++) {
        const data = {
            "id": (bodyRaw.travelers.length + 1).toString(),
            "travelerType": "CHILD",
            "fareOptions": [
                "STANDARD"
            ]
        }

        bodyRaw.travelers.push(data)
    }

    bodyRaw.originDestinations[0].originLocationCode = originLocationCode
    bodyRaw.originDestinations[0].destinationLocationCode = destinationLocationCode
    bodyRaw.originDestinations[0].departureDateTimeRange.date = formData.depature
    bodyRaw.searchCriteria.flightFilters.cabinRestrictions[0].cabin = formData.class.toUpperCase()
    
    const response = await fetch(`${BASE_URL}/v2/shopping/flight-offers`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRaw)
    })
    
    return response.json()
}