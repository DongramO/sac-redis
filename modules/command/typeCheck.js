const { promisify } = require("util");
const redis = require('redis');


const typeCheck = async (originClient, key, callback) => {

    const client = promisify(originClient.type).bind(originClient);
    
    await client(key)
    .then(type => {
        console.log("key type : ", type);
        return type
    })
    .catch(err => {
        console.log(err);
        return err
    }) 
}

module.exports = typeCheck;