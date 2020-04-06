
require('dotenv').config()

const redis = require('redis');
const migration = require('./modules/newMigration');
const config = require('./config');


const main = async () => {
	console.log('start proccess')

	let origin = null
	let target = null

	console.log('check target')
	process.argv.forEach((item, index) => {
	
		// origin 
		if(index === 2) {
			origin = config[item]
			console.log('original config \n', origin);
		}

		// target
		if(index === 3) {
			target = config[item];
			console.log('target config \n', target);
		}
			
	})

	const originClient = redis.createClient(origin);  
	const targetClient = redis.createClient(target)
	
	const result = await migration(originClient, targetClient);

	if(result) {
		console.log('err : ', err)
	}

	console.log('exit migration proccess')
	process.exit();
}

main();