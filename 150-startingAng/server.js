// get the things we need
var express = require('express');
var app     = express();
var path    = require('path');

// definir el folder 'public' para acceder los activos públicos
app.use(express.static(__dirname + '/public'));

// definiendo la única ruta para el index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));

});

// inicializando el servidor en 8080
app.listen(8080);
console.log('La magia pasa en el 8080.');
