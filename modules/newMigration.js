const config = require('../config');
const redis = require('redis');

const hgetset = require('./command/hashCommand')
const setCommand = require('./command/setCommand')
const typecheck = require('./command/typeCheck')
const { getset, getKeys } = require('./command/common')
// const listCommand = require('./command/hashCommand')



const migration = async (originClient, targetClient) => {
  
  console.log('access migration function')

  const allkeys = await getKeys(originClient)

  console.log('total orgi\'s allkeys count is : ', allkeys.length);
  let type = null

  try {
    for(let i=0; i<allkeys.length; ++i) {

      console.log('progress ====> ', ((i/allkeys.length) * 100).toFixed(2));
      
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
  } catch(e) {
    console.log(e)
  }
  
}

module.exports = migration
