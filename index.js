const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const migration = require('./modules/migration');

const app = express()



// app configuration 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/test', async (req, res) => {
	console.log("test1");
	await migration("ranking", 1)
	console.log("tess2");

	res.status(200).json({
		message: "complete"
	})
})

app.listen(4000, () => {
  console.log(`server port 3000, server is running now`)
})

module.exports = app




