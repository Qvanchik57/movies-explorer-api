const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: function (v) {
        return /((http(s){,1}):\/\/(www\.){0,}(a-zA-Z0-9~-\._:\/?#\[]@!$&'\(\)*\+,;=){2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9#])){0,}/.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
    validate: {
      validator: function (v) {
        return /((http(s){,1}):\/\/(www\.){0,}(a-zA-Z0-9~-\._:\/?#\[]@!$&'\(\)*\+,;=){2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9#])){0,}/.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: function (v) {
        return /((http(s){,1}):\/\/(www\.){0,}(a-zA-Z0-9~-\._:\/?#\[]@!$&'\(\)*\+,;=){2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9#])){0,}/.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
