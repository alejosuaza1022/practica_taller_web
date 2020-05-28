const { Pool } = require("pg");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
class s_pg {
    constructor() {
        const port = process.env.DB_PORT || 4000
        const host = process.env.DB_HOST || 4000
        const user = process.env.DB_USER || 4000
        const database = process.env.DB_NAME || 4000
        const password = process.env.DB_PASS || 4000
        this.pool = new Pool({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port
        });
    }
    async eje_sql(sql, params) {
        return await this.pool.query(sql, params);
    }


}
module.exports = s_pg;