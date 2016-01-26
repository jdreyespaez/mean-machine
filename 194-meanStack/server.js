// LLAMANDO LOS PAQUETES
var express     = require('express');
var app         = express(); // definir la app con express
var bodyParser  = require('body-parser');
var config      = require('./config');
var morgan      = require('morgan'); // usado para ver los requests
var mongoose    = require('mongoose');

// CONFIGURACIÓN DE LA APP
// usando body parser para tomar los datos POST en JSON
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// configurar el app para que haga CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  next();
});

// cargue todos los requests en la consola
app.use(morgan('dev'));

// conectando con la db en modulus.io
mongoose.connect(config.database);

// definir la ubicación de los archivos estáticos
// aquellos usados por los requests que hará el FRONTEND
app.use(express.static(__dirname + '/public'));

// RUTAS DE LA API
// ============================

// Una buena porción pasó a api.js


// MARCANDO LAS RUTAS
// todas las rutas tendrán como prefijo /api
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRouter);

// MAIN CATCHALL ROUTE
// SEND USERS TO FRONTEND
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirnam + '/public/app/views/index.html'));
});

// INICIANDO EL SERVIDOR
app.listen(config.port);
console.log('La magia pasa en el puerto' + config.port);
