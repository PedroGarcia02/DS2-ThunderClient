const { isAuth } = require('../middlewares/isAuth');
const { Router } = require('express');
const router = Router();

const AnimeController = require('./controller');
const controller = new AnimeController();

router.post('/cadastrar',isAuth, (req, res) => controller.cadastrar(req, res));
router.get('/mostrar',isAuth, (req, res) => controller.mostrar(req, res));
router.put('/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));
router.get('/:id', isAuth, (req, res) => controller.detail(req, res));

module.exports = router;