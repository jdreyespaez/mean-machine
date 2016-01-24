// LLAMANDO LOS PAQUETES
var express     = require('express');
var app         = express(); // definir la app con express
var bodyParser  = require('body-parser');
var morgan      = require('morgan'); // usado para ver los requests
var mongoose    = require('mongoose');
var User        = require('./app/models/user');
var port        = process.env.PORT || 8080;


// CONFIGURACIÓN DE LA APP
// usando body parser para tomar los datos POST en JSON
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// configurar el app para que haga CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  next();
});

// cargue todos los requests en la consola
app.use(morgan('dev'));

// conectando con la db en modulus.io
mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o'); 
// RUTAS DE LA API

// ruta básica del inicio
app.get('/', function(req, res) {
  res.send('¡Bienvenido a la página de inicio!');
});

// tomar una instancia del enrutador de express
var apiRouter = express.Router();

// middleware para todos los requests
apiRouter.use(function(req, res, next) {
  // hacer login
  console.log('Alguien entró a la API');

  // más adelante se usará más en Ch10
  // aquí se hará la autenticación de usuarios

  next();
});

// testeando que se puede acceder al API
// PostMan: GET hht://localhost:8080/api
apiRouter.get('/', function(req, res) {
  res.json({ message: 'Yey! Bienvenido al api!' });
});

// Aquí habrán más rutas

// MARCANDO LAS RUTAS
// todas las rutas tendrán como prefijo /api
app.use('/api', apiRouter);

// INICIANDO EL SERVIDOR
app.listen(port);
console.log('La magia pasa en el puerto' + port);
