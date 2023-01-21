const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'wifbsvtw',
    host: 'tiny.db.elephantsql.com',
    database: 'wifbsvtw',
    password: 'ajaK8JKXTanqUgORcwErxoKCi2RIu5jv',
    port: 5432,
});

module.exports = pool;
