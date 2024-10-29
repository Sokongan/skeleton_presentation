const mariadb = require('mariadb');

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 20
};

function createPool() {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        if (!global['__MARIADB_POOL__']) {
            global['__MARIADB_POOL__'] = mariadb.createPool(config);
        }
        return global['__MARIADB_POOL__'];
    } else {
        return mariadb.createPool(config)
    }
}

const dbPool = createPool();
module.exports = dbPool;
