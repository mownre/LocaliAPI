const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const db = require('./banco');


const porta = 3030;



const server = restify.createServer();



const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

server.listen(porta, function () {
    console.log(`Servidor rodando em ${porta}`);
});


server.get('/', function (req, res, next) {
    res.send('Ta tudo funcionando por enquanto.');
    next();
})


// Metodo getMarkes
server.get('/markers/listar', async function (req, res, next) {
    try {
        res.send(await db.markers().all());
    } catch(error) {
        res.send(error);
    }
})

//Método adicionarMarker
server.post('/markers/salvar', async function (req, res, next) {
    try {
        res.send(await db.markers().save(req.body));
    } catch(error) {
        res.send(error);
    }
});

server.put('/markers/atualizar', async function (req, res, next) {
    const {id, marker} = req.body;
    try {
        res.send(await db.markers().update(id, marker));
    } catch(error) {
        res.send(error);
    }
});

server.del('/markers/deletar', async function(req, res, next) {
    const {id} = req.body;
    try {
        res.send(await db.markers().delete(id));
    } catch (error) {
        res.send(error);
    }
})