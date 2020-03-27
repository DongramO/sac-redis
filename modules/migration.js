const config = require('../config');
const { promisify } = require("util");
const redis = require('redis');

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = (target, db) => {
  const mClient = redis.createClient(config.migrationConfig);  
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

    
  const targetClient= redis.createClient(configOption);
  console.log(targetClient);
  
  const getAsync = promisify(targetClient.keys).bind(targetClient);
  
  let allkeys = null;  
  getAsync('*').then(keys => {
    allkeys = keys
    
    for(var i = 0, len = keys.length; i < len; i++) {
      console.log("check elements keys : " , allkeys[i]);
     
	 // 동기처리 해줘야함 현재 비동기로 작동 중 
	  targetClient.get(keys[i], (err, value) => {
	  	console.log("error : ", err);
		console.log(value);
	  })
      
	  //mClient.hset(allkeys[i], [value], (err, res) => {

      
    }
    console.log("mmm", keys);

  }).catch((err) => {
    console.log(err);
  });

  console.log(2);
}


// client.hmset(["key", "foo", "bar"], function(err, res) {
//   // ...
// });

// // Works the same as
// client.hmset("key", ["foo", "bar"], function(err, res) {
//   // ...
// });

// // Or
// client.hmset("key", "foo", "bar", function(err, res) {
//   // ...
// });
//
//

module.exports = migration
