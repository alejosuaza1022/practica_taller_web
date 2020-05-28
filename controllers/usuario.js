const s_pg = require("../services/postgres")


let insertar_usuario = async(req, res) => {
    let servicio = new s_pg()
    let usuario = req.body;
    let sql = "insert into usuarios(documento,tipo_documento,nombre,apellidos,celular,correo,rol,clave)" +
        "values($1,$2,$3,$4,$5,$6,$7,md5($8));"
    await servicio.eje_sql(sql, [usuario.documento, usuario.tipo_documento, usuario.nombre,
        usuario.apellidos, usuario.celular, usuario.correo, usuario.rol, usuario.clave
    ]).then(res_bd => {
        res.status(200).send({
            message: ' usuario agregado ',
            usuario: res_bd
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error insertando en la base de datos, intente más tarde',
        error: error
    }))
}

let obtener_mecanicos = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select documento,tipo_documento,nombre,apellidos, celular,correo,rol  from usuarios where rol = 1;'
    await servicio.eje_sql(sql).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            usuario: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error en la base de datos, intente más tarde',
        error: error
    }));
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
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }));
}

let actualizar_usuario = async(req, res) => {
    let servicio = new s_pg();
    let usuario = req.body;
    let id_usuario = req.params.id;
    console.log(usuario);

    let sql = 'update usuarios set celular = $1, nombre = $2,' +
        'apellidos = $3 , correo = $4,' +
        'rol = $5,tipo_documento = $6 where documento = $7;'

    await servicio.eje_sql(sql, [usuario.celular, usuario.nombre, usuario.apellidos,
        usuario.correo, usuario.rol, usuario.tipo_documento, id_usuario
    ]).
    then(res_bd => {
        console.log(req.body);
        res.status(200).send({
            message: ' usuario actualizado',
            usuario: res_bd
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',
        error: error
    }));


}

let eliminar_usuario = async(req, res) => {
    let servicio = new s_pg();
    let id_usuario = req.params.id
    let sql = 'delete from usuarios where documento = $1 ;'
    await servicio.eje_sql(sql, [id_usuario]).then(async res_bd => {
        sql = 'delete from mantenimientos where id_mecanico = $1 and trabajos_realizados is null and horas_invertidas is null;'
        await servicio.eje_sql(sql, [id_usuario]).then(bd_res => {
            res.status(200).send({
                message: ' usuario eliminado ',
                evaluador: res_bd,
                mantenimiento: bd_res
            });
        }).catch(err => {
            res.status(500).send({
                message: 'se detecto  un error eliminando mantenimeintos en la base de datos, intente más tarde',

                error: error
            })
        })

    }).catch(error => res.status(500).send({
        message: 'se detecto  un error eliminando en la base de datos, intente más tarde',

        error: error
    }));


}



let registar_mantenimiento = async(req, res) => {
    let servicio = new s_pg()
    let placa = req.params.placa
    let id_usuario = req.params.id
    let fecha = req.body.fecha
    let trabajos_realizados = req.body.trabajos_realizados
    let horas_invertidas = req.body.horas_invertidas;
    console.log(horas_invertidas, fecha, req.body.trabajos_realizados, req.body)
    let sql = "update mantenimientos set trabajos_realizados = $1,  horas_invertidas =$2 where id_mecanico = $3 and placa =$4 and fecha=$5 ;"
    await servicio.eje_sql(sql, [trabajos_realizados, horas_invertidas, id_usuario, placa, fecha]).then(async bd_res => {
        sql = "update motos set estado = $1 where placa = $2"
        await servicio.eje_sql(sql, ["espera", placa]).then(bd_res2 =>
            res.status(200).send({
                message: ' mantenimiento agregado ',
                bd: bd_res
            })
        ).catch(error => res.status(500).send({
            message: 'se detecto un error en la base de datos, intente más tarde',
            error: error
        }))

    }).catch(error => res.status(500).send({
        message: 'se detecto un error en la base de datos, intente más tarde',
        error: error
    }))


}
let horas_laboradas = async(req, res) => {
    let servicio = new s_pg()
    let id = req.params.id;
    console.log(req.body);
    let fechaini = req.body.fechaini
    let fechafin = req.body.fechafin
    let sql = 'select id_mecanico,sum(horas_invertidas) from mantenimientos where fecha between $1 and $2 and id_mecanico = $3 group by id_mecanico;'
    await servicio.eje_sql(sql, [fechaini, fechafin, id]).then(bd_res => {
        res.status(200).send({
            message: "exitoso",
            data: bd_res.rows
        })
    }).catch(err => {
        res.status(500).send({
            message: 'se detecto un error en la base de datos, intente más tarde',
            error: err
        })

    })

}


module.exports = {
    insertar_usuario,
    eliminar_usuario,
    actualizar_usuario,
    obtener_usuarios,
    registar_mantenimiento,
    obtener_mecanicos,
    horas_laboradas
}