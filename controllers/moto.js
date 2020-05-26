const s_pg = require("../services/postgres")


let insertar_moto = async(req, res) => {
    let servicio = new s_pg()
    let moto = req.body;
    let sql = "insert into motos(placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica)" +
        "values($1,$2,$3,$4,$5,$6,$7,$8);"
    await servicio.eje_sql(sql, [moto.placa, moto.estado, moto.clase, moto.marca,
        moto.modelo, moto.color, moto.cilindraje, moto.id_propietario, moto.nro_soat, moto.vencimiento_soat, moto.nro_tecnomecanica, moto.vencimiento_tecnomecanica
    ]).then(res_bd => {
        res.status(200).send({
            message: ' moto agregada ',
            moto: res_bd
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}

let obtener_motos = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica  from motos;'
    await servicio.eje_sql(sql).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            moto: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));
}

let actualizar_moto = async(req, res) => {
    let servicio = new s_pg();
    let moto = req.body;
    let placa = req.params.id;
    let sql = 'update motos set estado = $1, set clase = $2,marca = $3,set modelo = $4,set color = 5,set cilindraje = 6,set id_propietario = 7,set nro_soat = 8,set vencimiento_soat = 9,set nro_tecnomecanica = $10,set vencimiento_tecnomecanica=$11 where placa = $12;'
    await servicio.eje_sql(sql, [moto.estado, moto.clase, moto.marca,
        moto.modelo, moto.color, moto.cilindraje, moto.id_propietario, moto.nro_soat, moto.vencimiento_soat, moto.nro_tecnomecanica, moto.vencimiento_tecnomecanica, placa
    ]).
    then(res_bd => {
        console.log(req.body);
        res.status(200).send({
            message: ' moto actualizada',
            moto: res_bd
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));


}

let eliminar_moto = async(req, res) => {
    let servicio = new s_pg();
    let placa = req.params.id
    let sql = 'delete from motos where id = $1 ;'
    await servicio.eje_sql(sql, [placa]).then(res_bd => {
        res.status(200).send({
            message: ' moto eliminada ',
            evaluador: res_bd
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));


}
let obtener_motos_disponibles = async(req, res) => {
    let servicio = new s_pg();
    let sql = "select placa,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica  from motos where estado = $1"
    await servicio.eje_sql(sql, ["espera"]).then(res_bd => {
        res.status(200).send({
            message: ' exitoso ',
            usuario: res_bd.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));
}

module.exports = {
    insertar_moto,
    eliminar_moto,
    actualizar_moto,
    obtener_motos,
    obtener_motos_disponibles
}