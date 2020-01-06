// core node module to set path
const hbs = require('hbs')
const path = require('path')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

/*
prints the directory path
console.log(__dirname) 

path.join takes from one directory to other
console.log(path.join(__dirname, '../public'))
*/

//express.static is a function that serve the given path
//app. use is function that takes return of express.static and runs it in browser

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather',
       name: 'Sailesh'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About App',
        name: 'Sailesh Thapa'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'This is help message',
        title:'Help',
        name:'Sailesh Thapa'
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(address, (error, data) => {
        if (error) {
            return res.send({error})
        }

        forecast(data.longitude, data.latitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                location: data.location,
                forecast: forecastdata
            })  
            
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sailesh',
        errorMessage:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sailesh',
        message:'Page not found'
    })
})

/* 
This method set up the web server   
The method app.get takes two parameter: string and callback function
    string consist of the path or route to look for
    callback function takes two parameters: req and res
    req: it is type of HTTP GET req.
    res: it sends the response to client in browser
*/


/*app.get('/help',(req,res)=>{
    res.send('Help page')
}) 

app.get('/about',(req,res)=>{
    res.send()
})
*/




//THis methods will start the server.
// It takes two parameter: port number and callback
// port number: AT this time the server is running only in our machine so, port number 
//               allocated to run this server is 3000. Later it can be changed
// callback:    It shows that our server is running
app.listen(port, () => {
    console.log('Server is up on port' + port +'.')
})