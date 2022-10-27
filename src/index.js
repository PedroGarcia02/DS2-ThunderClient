
const express = require('express');
const app = express();

app.use(express.json());

const animesRouter = require('./anime/routes');
app.use('/animes', animesRouter);

const usuariosRouter = require('./usuario/routes');
app.use('/usuarios', usuariosRouter);

const episodiosRouter = require('./episodio/routes');
app.use('/episodios', episodiosRouter);

app.listen(3000, () => console.log("Listening at 3000"));