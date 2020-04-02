const { promisify } = require("util");
const redis = require('redis');


const hgetCommand = async (originClient, key) => {
  const client = promisify(originClient.hgetall).bind(originClient);

  await client(key)
  .then(value => value)
  .catch(err)
}
  
const hsetCommand = async (originClient, key, value) => {
  const client = promisify(originClient.hset).bind(originClient);

  await client(key, value)
  .then(value => value)
  .catch(err)     
}

const hgetset = async (originClient, key) => {

  const value = await hgetCommand(originClient, key)
  await hsetCommand(originClient, key, value);
}

module.exports = hgetset;