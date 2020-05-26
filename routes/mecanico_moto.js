const express = require('express')
const router = express.Router()
const controlador_mantenimientos = require('../controllers/mecanico_moto')
router.post("/:placa/:id", controlador_mantenimientos.insertar_mantenimiento)
router.get("/:id", controlador_mantenimientos.obtener_matenimientos_disponibles)
router.delete("/:placa/:id", controlador_mantenimientos.eliminar_mantenimiento);

module.exports = router