const express = require('express')
const router = express.Router()
const controlador_usuario = require('../controllers/usuario')
router.post("/", controlador_usuario.insertar_usuario)
router.put("/:id", controlador_usuario.actualizar_usuario)
router.delete("/:id", controlador_usuario.eliminar_usuario);
router.get("/", controlador_usuario.obtener_usuarios)
router.put("/registar-mantenimiento/:id/:placa", controlador_usuario.registar_mantenimiento)

module.exports = router