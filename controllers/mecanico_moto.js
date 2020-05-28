const s_pg = require("../services/postgres")

let insertar_mantenimiento = async(req, res) => {
    let servicio = new s_pg()
    let placa = req.params.placa
    let id_usuario = req.params.id
    let fecha = req.body.fecha
    let sql = "insert into mantenimientos (id_mecanico,placa,fecha) values ($1,$2,$3);"
    await servicio.eje_sql(sql, [id_usuario, placa, fecha]).then(async bd_res => {
        sql = "update motos set estado = $1 where placa = $2;";
        await servicio.eje_sql(sql, ["mantenimiento", placa]).then(bd_res2 =>
            res.status(200).send({
                message: ' mantenimiento agregado ',
                bd: bd_res
            })
        ).catch(error => res.status(500).send({
            message: 'se detecto  un error en la base de datos, intente más tarde',

            error: error
        }))

    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }))



}



let eliminar_mantenimiento = async(req, res) => {
    let servicio = new s_pg();
    let placa = req.params.placa
    let id_usuario = req.params.id
    let fecha = req.body.fecha
    console.log(req.body)
    let sql = 'delete from mantenimientos where id_mecanico = $1 and placa =$2 and fecha = $3;'
    await servicio.eje_sql(sql, [id_usuario, placa, fecha]).then(async res_bd => {
        sql = "update motos set estado = $1 where placa = $2;";
        await servicio.eje_sql(sql, ["espera", placa]).then(bd_res2 =>
            res.status(200).send({
                message: ' mantenimiento eliminado ',
                bd: res_bd
            })
        ).catch(error => res.status(500).send({
            message: 'se detecto  un error en la base de datos, intente más tarde',

            error: error
        }))
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }));
}

let obtener_matenimientos_disponibles = async(req, res) => {
    let servicio = new s_pg();
    let id = req.params.id
    let sql = "select motos.placa,fecha from mantenimientos inner join motos on motos.placa = mantenimientos.placa where id_mecanico = $1 and trabajos_realizados is null and horas_invertidas is null and estado = $2"
    await servicio.eje_sql(sql, [id, 'mantenimiento']).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            data: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }));
}
let obtener_matenimientos_disponiblesT = async(req, res) => {
    let servicio = new s_pg();
    let sql = "select placa,fecha,id_mecanico from mantenimientos where  trabajos_realizados is null and horas_invertidas is null"
    await servicio.eje_sql(sql).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            data: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }));
}
let obtener_matenimientos_disponiblesTot = async(req, res) => {
    let servicio = new s_pg();
    let sql = "select placa,fecha,id_mecanico from mantenimientos;"
    await servicio.eje_sql(sql).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            data: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto  un error en la base de datos, intente más tarde',

        error: error
    }));
}

module.exports = {
    obtener_matenimientos_disponibles,
    insertar_mantenimiento,
    eliminar_mantenimiento,
    obtener_matenimientos_disponiblesT,
    obtener_matenimientos_disponiblesTot
}