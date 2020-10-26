const Pool = require('pg').Pool;
const env = require('../../env');

const dbConfig = {connectionString: env.database_url};
const pool = new Pool(dbConfig);

module.exports = pool;