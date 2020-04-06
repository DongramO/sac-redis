const config = require('../config');
const redis = require('redis');

const hgetset = require('./command/hashCommand')
const setCommand = require('./command/setCommand')
const typecheck = require('./command/typeCheck')
const { getset, getKeys } = require('./command/common')
// const listCommand = require('./command/hashCommand')



const migration = async (origin, target, db) => {
  
  console.log('access migration function')

  const originClient = redis.createClient(config[origin]);  

  if(target) configOption = config[target]
  if(db !== null || db !== undefined ) configOption.db = db

  const targetClient = redis.createClient(configOption)

  const allkeys = await getKeys(originClient)

  let type = null
  for(let i=0; i<allkeys.length; ++i) {

    key = allkeys[i];  
    type = await typecheck(originClient, key);
    
    if(type === 'hash') {
      await hgetset(originClient, targetClient, key)

    } else if(type === 'set') {
      await setCommand(originClient, targetClient, key)

    } else if(type === 'list') {

    } else if(type === 'string') {
	  await getset(originClient, targetClient, key)

    } else {

    }
  }
}

module.exports = migration
