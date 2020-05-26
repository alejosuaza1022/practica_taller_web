const s_pg = require("../services/postgres")
const jwt = require("jsonwebtoken");
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

/**
 * Consultar la usuario en el sistema con documento y clave
 * @param {*} usuario
 */
async function consultar_usuario(usuario) {
    let _servicio = new s_pg();
    let valores = [usuario.documento, usuario.clave];
    let sql = `SELECT * FROM usuarios WHERE documento=$1 AND clave=md5($2)`;
    return await _servicio.eje_sql(sql, valores);
};

function generar_token(usuario) {
    delete usuario.clave;
    let token = jwt.sign(usuario, process.env.KEY);
    return token;
}





function verificar_token(token) {
    return jwt.verify(token, process.env.KEY);
}




let validar_usuario = async(req, res) => {
    try {
        consultar_usuario(req.body).
        then(bd_res => {
            let usuario =
                bd_res.rowCount > 0 ? bd_res.rows[0] : undefined;
            if (usuario) {
                let token = ''
                token = generar_token(usuario)
                res
                    .status(200)
                    .send({
                        info: token,
                        nombre: usuario.nombre,
                        mensaje: "evaluador autenticado."
                    });
            } else {
                res.status(400).send({
                    mensaje: "Documento y/o clave incorrecta.",
                });
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

}

let decode_pesona = (token) => {

    try {
        return jwt.decode(token);
    } catch (error) {
        return null
    }

}

let verificarAut = (req, res) => {
    try {
        let token = req.headers.token;
        let modulo = req.body.modulo;
        verificar_token(token)
        let usuario = decode_pesona(token)
        if (modulo === 'admin') {
            if (usuario)
                if (usuario.rol !== 2)
                    throw error("no tiene permisos")
        }
        res.status(200).send({
            ok: true,
            mensaje: "Autenticado.",
        });
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}

module.exports = {
    validar_usuario,
    verificarAut,
}