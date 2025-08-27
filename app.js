const express = require('express')
const app = express()
require('./model/index.js')

const PORT = 3000


app.listen(PORT,()=>{
    console.log(`Server has started at Port: ${PORT}`)
})