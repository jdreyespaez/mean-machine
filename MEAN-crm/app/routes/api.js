var User      = require('../models/user');
var jwt       = require('jsonwebtoken');
var config    = require('../../config');

// cambió la forma de crear super secret tokens
var superSecret = config.secret;

module.exports = function(app, express) {
  // tomar una instancia del enrutador de express
  var apiRouter = express.Router();

  // CHAPTER 10: Node Authentication
  // la ruta para autenticar usuarios
  // Postman: POST http://localhost:8080/authenticate
  apiRouter.post('/authenticate', function(req, res) {

    // encontrar el usuario
    // seleccionar el name, username y password explícitamente
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {

      if (err) throw err;

      // ningún usuario con tal username se encontró
      if (!user) {
        res.json({
          success: false,
          messsage: 'Autenticación fallida. Usuario no encontrado.'
        });
      } else if (user) {

        // revisar si el password coincide
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Autenticación fallida. Clave errada.'
          });
        } else {

          // si el usuario y la clave son correctas
          // entonces crear el token

          var token = jwt.sign({
            name: user.name,
            username: user.username
          }, superSecret, {
            expiresInMinutes: 1 // expira en 24 horas
          });

          // devolver la información incluyendo el token como JSON
          res.json({
            success: true,
            message: '¡Disfruta tu token',
            token: token
          });
        }
      }

    });
  });

  // middleware para todos los requests
  apiRouter.use(function(req, res, next) {
    // hacer login
    console.log('Alguien entró a la API');

    // más adelante se usará más en Ch10
    // aquí se hará la autenticación de usuarios

    // revisar header, url params o post params para el token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decodificar el token
    if (token) {

      // verificar secret y checka si expira
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Falló al autenticar token.'
          });
        } else {
          // si todo está bien, guardar para otras rutas
          req.decoded = decoded;

          // se ubicó para darle paso cuando todo esté correcto
          next();

        }
      });
    } else {

      // si no hay token devolver como la rta 403 HTTP (access forbidden)
      // y un mensaje de error
      return res.status(403).send({
        success: false,
        message: 'No hay token activo.'
      });
    }

    // next(); debía estar acá
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

    // tomar el userio con id user_id
    // Postman: GET http://localhost:8080/api/users/:user_id
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        // devolver ESE usuario
        res.json(user);
      });
    })

  // Updating a User's Info (PUT /api/users/:user_id)

    // actualizar el usuario con ese id
    // Postman: PUT http://localhost:8080/api/users/:user_id
    .put(function(req, res) {

      // utilizar el modelo user para buscar el usuario que queremos
      User.findById(req.params.user_id, function(err, user) {

        if(err) res.send(err);

        // actualizar al usuario sólo si es nuevo
        if (req.body.name) user.name          = req.body.name;
        if (req.body.username) user.username  = req.body.username;
        if (req.body.password) user.password  = req.body.password;

        // guardarlo
        user.save(function(err) {
          if (err) res.send(err);
          // devolver un mensaje

          res.json({ message: '¡Usuario actualizado!', usuario: user});
        });

      });
    })

  // Deleting a user (DELETE /api/users/:user_id)

    // eliminar tal usuario
    // Postman: DELETE http://localhost:8080/api/users/:user_id
    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) return res.send(err);

        res.json({ message: 'Eliminado.' });
      });
    });
    return apiRouter;
};
