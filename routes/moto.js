const express = require('express')
const router = express.Router()
const controlador_moto = require('../controllers/moto')
router.post("/", controlador_moto.insertar_moto)
router.put("/:id", controlador_moto.actualizar_moto)
router.delete("/:id", controlador_moto.eliminar_moto);
router.get("/", controlador_moto.obtener_motos)
router.get("/disponibles", controlador_moto.obtener_motos_disponibles)

module.exports = router