const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { router } = require('./src/routes/router')


app.use(router)


app.listen(5000,(req,res)=>{
    console.log("Server is listening on port 5000....")
})