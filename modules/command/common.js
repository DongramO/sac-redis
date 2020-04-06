const { promisify } = require("util");
const redis = require('redis');


const getCommand = async (originClient, key) => {
  const client = promisify(originClient.get).bind(originClient);

  return await client(key)
  .then(value => {console.log(value); return value})
  .catch(err => throws(err))
}
  
const setCommand = async (targetClient, key, value) => {
  const client = promisify(targetClient.set).bind(targetClient);

  return await client(key, value)
  .then(value => value)
  .catch(err => throws(err))    
}

const getset = async (originClient, targetClient, key) => {
  console.log("getset");
  const value = await getCommand(originClient, key)
  await setCommand(targetClient, key, value);
}

const getKeys = async (originClient) => {
  const client = promisify(originClient.keys).bind(originClient);

  return await client('*')
    .then(keys => keys)
    .catch(err => throws(err))
}

module.exports = {
  getset,
  getKeys,
}
