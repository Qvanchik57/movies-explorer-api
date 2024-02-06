const mongoDbAddr = {
  mongoDB: 'mongodb://localhost:27017/mestodb'
}

const errorMessage = {
  notFoundPageErrorMessage: 'Страница не найдена',
  serverError: 'На сервере произошла ошибка',
  notFoundUserError: 'Пользователь с указанным _id не найден',
  validationPatchError: 'Переданы некорректные данные при обновлении профиля',
  validationCreateUserError: 'Переданы некорректные данные при создании пользователя',
  conflictError: 'Пользователь уже зарегистрирован',
  validationCreateMovieError: 'Переданы некорректные данные при создании фильма',
  notFoundMovieError: 'Передан несуществующий _id фильма',
  foreignError: 'Удаление чужого фильма невозможно',
  validationDeleteMovieError: 'Переданы некорректные данные при удалении фильма',
  authNotFoundUserError: 'Пользователь не найден',
  authNotCompareError: 'Неправильные почта или пароль',
  validationEmail: 'Неправильный формат почты',
  validationURL: 'URL validation error',
  notAuthError: 'Необходима авторизация'
}

const statusError = {
  serverError: 500,
  notFoundError: 404,
  conflictError: 409,
  foreignError: 403,
  notAuthError: 401,
  validationError: 400,
  conflictError: 11000
}

const statusReq = {
  goodReq: 200,
  createReq: 201
}

module.exports = {
  mongoDbAddr,
  errorMessage,
  statusError,
  statusReq
}
