const express = require("express");
const morgan = require('morgan')
var cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/motos', require('./routes/moto'))
app.use('/api/mantenimientos', require('./routes/mecanico_moto'))
app.use('/api/usuario', require('./routes/usuario'))
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("corriendo en " + port);
});