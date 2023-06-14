const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const app=express();

const publicDirectory=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Mohd Arbaz'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Mohd Arbaz'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast : forecastData
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        helpText : 'This is some helpful text',
        name : 'Mohd Arbaz'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name : 'Mohd Arbaz',
        errorMessage : 'Help article not found',
        title : '404'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage : 'Page not found',
        name : 'Mohd Arbaz',
        title : '404'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000')
})