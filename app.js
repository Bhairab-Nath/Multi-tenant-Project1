const express = require('express')
const app = express()
require('dotenv').config();
require('./model/index.js')
const authRoute = require('./routes/authRoute.js')
const orgRoute = require('./routes/organizationRoute.js')
app.use(express.json())
app.use(express.urlencoded({extended:true}))



const PORT = 3000

app.use("",authRoute)
app.use("",orgRoute)




app.listen(PORT,()=>{
    console.log(`Server has started at Port: ${PORT}`)
})