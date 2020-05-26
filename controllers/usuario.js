const s_pg = require("../services/postgres")


let insertar_usuario = async(req, res) => {
    let servicio = new s_pg()
    let usuario = req.body;
    let sql = "insert into usuarios(documento,tipo_documento,nombre,apellidos, celular,correo,rol,clave)" +
        "values($1,$2,$3,$4,$5,$6,$7,$8);"
    await servicio.eje_sql(sql, [usuario.documento, usuario.tipo_documento, usuario.nombre,
        usuario.apelldios, usuario.celular, usuario.correo, usuario.rol, usuario.clave
    ]).then(res_bd => {
        res.status(200).send({
            message: ' usuario agregado ',
            usuario: res_bd
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}

let obtener_usuarios = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select documento,tipo_documento,nombre,apellidos, celular,correo,rol  from usuarios;'
    await servicio.eje_sql(sql).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            usuario: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));
}

let actualizar_usuario = async(req, res) => {
    let servicio = new s_pg();
    let usuario = req.body;
    let id_usuario = req.params.id;
    let sql = 'update usuarios set celular = $1, nombre = $2,' +
        'apellidos = $3 , correo = $4, ' +
        'rol = $5  where id = $5;'


    await servicio.eje_sql(sql, [usuario.celular, usuario.nombre, usuario.apellidos,
        usuario.correo, usuario.rol, id_usuario
    ]).
    then(res_bd => {
        console.log(req.body);
        res.status(200).send({
            message: ' usuario actualizado',
            usuario: res_bd
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));


}

let eliminar_usuario = async(req, res) => {
    let servicio = new s_pg();
    let id_usuario = req.params.id
    let sql = 'delete from usuarios where id = $1 ;'
    await servicio.eje_sql(sql, [id_usuario]).then(res_bd => {
        res.status(200).send({
            message: ' usuario eliminado ',
            evaluador: res_bd
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));


}



let registar_mantenimiento = async(req, res) => {
    let servicio = new s_pg()
    let placa = req.params.placa
    let id_usuario = req.params.id
    let fecha = req.body.fecha
    let trabajos_realizados = req.body.trabajos_realizados
    let horas_invertidas = req.body;

    let sql = "updata mantenimientos set trabajos_realizados = $1,  horas_invertidas =$3 where id_mecanico = $4 and placa =$5 and fecha=$6 ;"
    await servicio.eje_sql(sql, [trabajos_realizados, horas_invertidas, id_usuario, placa, fecha]).then(async bd_res => {
        sql = "update motos set estado = $1 where placa = $2"
        await servicio.eje_sql(sql, ["espera", placa]).then(bd_res2 =>
            res.status(200).send({
                message: ' mantenimiento agregado ',
                bd: bd_res
            })
        ).catch(error => res.status(500).send({
            message: 'se detecto un error',
            error: error
        }))

    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}


module.exports = {
    insertar_usuario,
    eliminar_usuario,
    actualizar_usuario,
    obtener_usuarios,
    registar_mantenimiento
}