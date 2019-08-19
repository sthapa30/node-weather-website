const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3h0OTQ0MiIsImEiOiJjandkbGdoNW8wMG80NDNxemVqaG1kMzg1In0.lWdYze8ynXkFM9D3_Wmz9Q'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect to Geo Location Services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to search location. Try different name!', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name


            })


        }
    })



}
module.exports = geoCode
