const config = require('../config');
const { promisify } = require("util");
const redis = require('redis');

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = async (target, db) => {
  const mClient = redis.createClient(config.migrationConfig);  
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

    
  const targetClient= redis.createClient(configOption);
  
  const getAsync = promisify(targetClient.keys).bind(targetClient);
  const getClient = promisify(targetClient.get).bind(targetClient);

  let allkeys = null;  
  await getAsync('*').then(async (keys) => {
    allkeys = keys
    console.log("mmm", allkeys);

	await getClient(allkeys[0]).then((err, value) => {
		console.log('bbb')
	})

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
