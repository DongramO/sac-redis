const config = require('../config');
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

  // const rClient= redis.createClient(config.rankingConfig);  
  // const uClient= redis.createClient(config.userConfig);  
  // const aClient= redis.createClient(config.adminConfig);  

const migration = (target, db) => {
  const mClient = redis.createClient(config.migrationConfig);  
  
  configOption = config[target]
  
  if(db !== null || db !== undefined ) configOption.db = db

    
  const targetClient= redis.createClient(configOption);
  const getAsync = promisify(targetClient.keys).bind(targetClient);
  
  let allkeys = null;  
  getAsync.then((keys) => {
    allkeys = keys
    
    for(var i = 0, len = keys.length; i < len; i++) {
      console.log("check elements keys : " , allkeys[i]);
      targetClient.hgetAll
      mClient.hset(allkeys[i], [value], (err, res) => {

      })
    }
    console.log(res);

  }).catch((err) => {
    console.log(err);
  });

  await client.get("test", (err, value) => {
    if(err) {
      res.status(500).json({
        message: "redis connetion error",
        info: err,
      })

      return;
    }

    console.log("print value ", value);

  })

  console.log(2);
  res.status(200).json({
    message: 'return ok'
  });
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