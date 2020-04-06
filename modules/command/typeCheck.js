const { promisify } = require("util");
const redis = require('redis');


const typeCheck = async (originClient, key, callback) => {

    const client = promisify(originClient.type).bind(originClient);
    
    return await client(key)
    .then(type => type)
    .catch(err => throws(err))
}

module.exports = typeCheck;
