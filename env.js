const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, './.env')});
module.exports = {database_url: process.env.DATABASE_URL};