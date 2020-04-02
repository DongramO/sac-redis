const config = require('../config');
const { promisify } = require("util");
const redis = require('redis');

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = async (target, db) => {
  const mClient = redis.createClient(config.user);  
  const tClient = redis.createClient(config.migrationConfig);
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

  const targetClient= redis.createClient(configOption);
  const getAsync = promisify(mClient.keys).bind(mClient);
  const typeCheck = promisify(mClient.type).bind(mClient);
  const getMigrationClient = promisify(mClient.get).bind(mClient);
  const smemMigrationClient = promisify(mClient.smembers).bind(mClient);
  const hgetMigrationClient = promisify(mClient.hgetall).bind(mClient);
  
  const setClient = promisify(tClient.set).bind(tClient);
  const saddClient = promisify(tClient.sadd).bind(tClient);
  const hsetClient = promisify(tClient.hset).bind(tClient);
  

  let allkeys = null;  

  await getAsync('*').then(async (keys) => {
    
    allkeys = keys
  	console.log("size : ", allkeys.length);

    for(let i=0; i<allkeys.length; ++i) {
      await typeCheck(allkeys[i]).then(async type => {
        console.log("type : ", type)	
        
        if(type === 'hash') {
          
          await hgetMigrationClient(allkeys[i]).then( async(value) => {         
            console.log("keys ====>" , allkeys[i], " value ====>" , value)             
            
            await hsetClient(allkeys[i], value).then((value) => {})
  
            .catch(err => {
              console.log("last err: ", err);
              return;
            })      
          })

        } else if (type === 'set') {
          
          await smemMigrationClient(allkeys[i]).then(async(value) => {         
            console.log("keys ====>" , allkeys[i], " value ====>" , value)             
            
            await saddClient(allkeys[i], value).then((value) => {})
  
            .catch(err => {
              console.log("last err: ", err);
              return;
            })      
          })

        } else if (type === 'string') {
          
          await getMigrationClient(allkeys[i]).then( async(value) => {         
            console.log("keys ====>" , allkeys[i], " value ====>" , value)             
            
            await setClient(allkeys[i], value).then((value) => {})
  
            .catch(err => {
              console.log("last err: ", err);
              return;
            })      
          })
        } else {

        }
	  }).catch(err => {})   
      }
    })
	.catch((err) => {
    	console.log("err" , err);
		return;
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
