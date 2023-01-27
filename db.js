const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'TriThuc2321',
    host: 'ep-wispy-recipe-595318.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: 'sWPS0QwdoRp2',
    port: 5432,
    ssl: require,
});

module.exports = pool;
