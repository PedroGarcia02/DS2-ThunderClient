const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const ExerciciosController = require('./controller');
const controller = new ExerciciosController();

router.post('/cadastrar', (req, res) => controller.cadastrar(req, res));
router.post('/auth', (req, res) => controller.auth(req, res));
router.get('/mostrar', (req, res) => controller.mostrar(req, res));

module.exports = router;