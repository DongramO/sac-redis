const config = require('../config');
const { promisify } = require("util");
const redis = require('redis');

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = async (target, db) => {
  const mClient = redis.createClient(config.migrationConfig);  
  const tClient = redis.createClient(config.shard);
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

  const targetClient= redis.createClient(configOption);
  const getAsync = promisify(mClient.keys).bind(mClient);
  const getClient = promisify(tClient.get).bind(tClient);

  let allkeys = null;  

  await getAsync('*').then(async (keys) => {
    
    allkeys = keys
  
    for(let i=0; i<allkeys.length; ++i) {
      await getAsync(allkeys[i]).then( async(value) => {
        console.log("123", value)
        
		console.log('1234 1234');
        await getClient(allkeys[i]).then((value) => {
          console.log("value : ", value)
        })
		.catch(err => {
			console.log(err);
		})
        
      })
    }
	  
  }).catch((err) => {
    console.log("err" , err);
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
