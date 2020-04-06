const { promisify } = require("util");
const redis = require('redis');


const smemCommand = async (originClient, key) => {
  const client = promisify(originClient.smembers).bind(originClient);

  return await client(key)
  .then(value => value)
  .catch(err => throws(err))
}
  
const saddCommand = async (targetClient, key, value) => {
  const client = promisify(targetClient.sadd).bind(targetClient);

  return await client(key, value)
  .then(value => value)
  .catch(err => throws(err)) 
}

const setCommand = async (originClient, targetClient, key) => {

  const value = await smemCommand(originClient, key)
  await saddCommand(targetClient, key, value);
}



module.exports = setCommand;
