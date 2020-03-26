const express = require('express')
const redis= require('redis')
const bodyparser = require('body-parser')

const client = redis.createClient({
 host: "test2.k5ujjq.0001.apn2.cache.amazonaws.com",
 port: 6379,
 db: 0
 });

 const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))

app.get('/test', async (req, res) => {
  console.log('access');

  await client.set('test2','aaaaa', (err, res) => {
  	console.log('err : ', err);
  	console.log('res : ', res);
  })

  await client.get('test2', (err, value) => {
   console.log(err);
   console.log(value);
  })

  res.status(200).send({message: 'test'});
})


app.listen(3000, () => {
  console.log('server port opening');
})
