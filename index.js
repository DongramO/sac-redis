const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const config = require('../sac-redis/config');

const app = express()



// app configuration 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/test', async (req, res) => {
  
})

app.listen(3000, () => {
  console.log(`server port 3000, server is running now`)
})

module.exports = app




