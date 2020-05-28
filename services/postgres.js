const {
    Pool
} = require("pg");
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})
class s_pg {
    constructor() {
        const port = "5432"
        const host = "ec2-34-230-149-169.compute-1.amazonaws.com"
        const user = "crirojimoyfovc"
        const database = "d8rnvkq5i6q51n"
        const password = "b0033587c42348346d0b8be24e51716202da2f930f23db2d638994515382b51b"
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