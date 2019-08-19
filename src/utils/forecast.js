const request = require('request')
const forecast = (longitude,latitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/79763711221c070a835082c47c472afa/'+encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'?units=si'
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + 
            response.body.currently.temperature + ' degree Celcius. There is a '+ response.body.currently.precipProbability +'% chance of rain.')
        }
    })
}


module.exports = forecast