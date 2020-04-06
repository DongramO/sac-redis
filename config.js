const ranking = {
  host: process.env.RANKING_HOST,
  port: process.env.RANKING_PORT,
  db: process.env.RANKING_DB, 
}

const shard = {
  host: process.env.SHARD_HOST,
  port: process.env.SHARD_PORT,
  db: process.env.SHARD_DB, 
}

const user1 = {
  host: process.env.USER1_HOST,
  port: process.env.USER1_PORT,
  db: process.env.USER1_DB, 
}

const user2 = {
  host: process.env.USER2_HOST,
  port: process.env.USER2_PORT,
  db: process.env.USER2_DB, 
}

const user3 = {
  host: process.env.USER3_HOST,
  port: process.env.USER3_PORT,
  db: process.env.USER3_DB, 
}

const admin = {
  host: process.env.ADMIN_HOST,
  port: process.env.ADMIN_PORT,
  db: process.env.ADMIN_DB, 
}

const target = {
  host: process.env.TARGET_HOST,
  port: process.env.TARGET_PORT,
  db: process.env.TARGET_DB, 
}

module.exports = {
  ranking,
  shard,
  user1,
  user2,
  user3,
  admin,
  target,
}
