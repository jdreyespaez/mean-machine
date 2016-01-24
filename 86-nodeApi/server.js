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
mongoose.connect('localhost:27017/usuarios');

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

// las rutas que finalizan en /users
apiRouter.route('/users')

  // creando un usurio
  // Postman: POST http://localhost:8080/api/users
  .post(function(req, res) {

      // crear un nueva instancia al modelo User
      var user = new User();

      // definir la información de los users
      user.name     = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;

      // guardar el usuario y verificar errores
      user.save(function(err) {
        if (err) {
          // duplicar la entrada ??
          if (err.code == 11000)
            return res.json({ success: false, message: 'Un usuario con ese username ya existe.' });
          else
            return res.send(err);
          }
            res.json({ message: '¡Usuario creado!'});
      });
    })

    // acceder a todos los usuarios
    // Postman: GET http://localhost:8080/api/users
    .get(function(req, res) {
        User.find(function(err, users) {
          if (err) res.send(err);

          // return todos los usuarios
          res.json(users);
        });
    });

// Getting a Single User (GET /api/users/:user_id)
apiRouter.route('/users/:user_id')

  // tomar el useria con id user_id
  // Postman: GET http://localhost:8080/api/users/:user_id
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);

      // devolver ESE usuario
      res.json(user);
    });
  })

// MARCANDO LAS RUTAS
// todas las rutas tendrán como prefijo /api
app.use('/api', apiRouter);

// INICIANDO EL SERVIDOR
app.listen(port);
console.log('La magia pasa en el puerto' + port);
