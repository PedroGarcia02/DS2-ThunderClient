const { isAuth } = require('../middlewares/isAuth');
const { Router } = require('express');
const router = Router();

const EpisodioController = require('./controller');
const controller = new EpisodioController();

router.delete('/:id', isAuth, (req, res) => controller.delete(req, res));
router.put('/:id', isAuth, (req, res) => controller.update(req, res));
router.get('/mostrar', (req, res) => controller.mostrar(req, res));

module.exports = router;