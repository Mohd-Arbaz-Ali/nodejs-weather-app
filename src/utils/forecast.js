const request=require('request')

const forecast = (lattitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=68a009a0faca4202f5adb9418f05c278&query='+ lattitude +',' + longitude + '&units=f'
    request({url ,json : true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location service!',undefined)
        }else if(body.error){
            callback('Unable to find the location!',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degree out there.' + ' It feels like '+ body.current.feelslike + ' degree out.')
        }
    })
}

module.exports = forecast