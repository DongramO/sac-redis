const { promisify } = require("util");
const redis = require('redis');


const hgetCommand = async (originClient, key) => {
  const client = promisify(originClient.hgetall).bind(originClient);

  return await client(key)
  .then(value => value)
  .catch(err => throws(err))
}
  
const hsetCommand = async (originClient, key, value) => {
  const client = promisify(originClient.hmset).bind(originClient);

  console.log("key, value pair", key," : ",value)
  return await client(key, value)
  .then(value => value)
  .catch(err => throws(err))
}

const hgetset = async (originClient, targetClient, key) => {

  const value = await hgetCommand(originClient, key)
  return await hsetCommand(targetClient, key, value);
}

module.exports = hgetset;
