const { promisify } = require("util");
const redis = require('redis');


const getCommand = async (originClient, key) => {
  const client = promisify(originClient.get).bind(originClient);

  await client(key)
  .then(value => value)
  .catch(err)
}
  
const setCommand = async (targetClient, key, value) => {
  const client = promisify(targetClient.set).bind(targetClient);

  await client(key, value)
  .then(value => value)
  .catch(err)     
}

const getset = async (originClient, targetClient, key) => {

  const value = await getCommand(originClient, key)
  await setCommand(targetClient, key, value);
}

const getKeys = async (originClient) => {
  const client = promisify(originClient.keys).bind(originClient);

  return await getAsync('*')
    .then(keys => keys)
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  getset,
  getKeys,
}