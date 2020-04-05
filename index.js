const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const migration = require('./modules/newMigration');

const app = express()



// app configuration 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/test', async (req, res) => {
	await migration("user", "migration", 1)
	res.status(200).json({
		message: "complete"
	})
})

app.listen(4000, () => {
  console.log(`server port 3000, server is running now`)
})

module.exports = app




