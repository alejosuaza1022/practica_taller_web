const { Pool } = require("pg");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
class s_pg {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT
        });
    }
    async eje_sql(sql, params) {
        return await this.pool.query(sql, params);
    }


}
module.exports = s_pg;