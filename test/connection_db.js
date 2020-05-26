let pg = require("../services/postgres")
let s_pg = pg
let s = new s_pg();
s.pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    s.pool.end()
})
module.exports = s_pg;