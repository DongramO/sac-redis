const config = require('../config');
const { promisify } = require("util");
const redis = require('redis');

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = async (target, db) => {
  const mClient = redis.createClient(config.migrationConfig);  
  const tClient = redis.createClient(config.user);
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

  const targetClient= redis.createClient(configOption);
  const getAsync = promisify(mClient.keys).bind(mClient);
  //const getClient = promisify(targetClient.hset).bind(targetClient);

  let allkeys = null;  

  await getAsync('*').then(async (keys) => {
    
    allkeys = keys
  
    for(let i=0; i<allkeys.length; ++i) {
      await getAsync(allkeys[i]).then((err, value) => {
        if(err) {
          console.log(err)
          break;
        }
        
        await tClient.get(allkeys[i], (err, value) => {
          console.log("err : ", err)
          console.log("value : ", value)
        })
        
        
      })
    }
	  
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
