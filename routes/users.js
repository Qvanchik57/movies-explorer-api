const router = require('express').Router();
const { getThisUser, patchUser } = require('../controllers/users');
const { userValidation } = require('../middlewares/validation');

router.get('/users/me', getThisUser);

router.patch('/users/me', userValidation, patchUser);

module.exports = router;
