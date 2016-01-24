// tomar los paqetes que necesitamos para el modelo user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user Schema
var UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false }
});

// esconder el password antes de que el usuario lo guarde
UserSchema.pre('save', function(next) {
  var user = this;

  // esconder el password antes que sea cambiado o sea un usuario nuevo
  if (!user.isModified('password')) return netx();

  // crear el hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // cambiar a la versión hasheada
    user.password = hash;
    next();
  });
});

// método para comparar un password con el hash de la DB
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// devolver el modelo
module.exports = mongoose.model('User', UserSchema);
