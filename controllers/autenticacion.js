const s_pg = require("../services/postgres")
const jwt = require("jsonwebtoken");
const path = require('path')
const key = "3b41fd3b3667d0a7b303a1f03c5a0f0662f97581443850ee9931d22f38e08c76"
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
    let token = jwt.sign(usuario, key);
    return token;
}





function verificar_token(token) {
    return jwt.verify(token, key);
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
                        rol: usuario.rol,
                        message: "evaluador autenticado."
                    });
            } else {
                res.status(400).send({
                    message: "Documento y/o clave incorrecta.",
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
    console.log(req.body);
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
            message: "Autenticado.",
        });
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            message: "No autenticado.",
        });
    }
}

module.exports = {
    validar_usuario,
    verificarAut,
}