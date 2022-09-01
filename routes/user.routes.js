const router = require('express').Router();
const { getARandomUser, getAllUsers, saveAUser } = require('../controllers/user.controller');
const { validateSaveUserRequest, isRequestValidated } = require('../validators/user.validators');

router.get('/random', getARandomUser);
router.get('/all', getAllUsers);
router.post('/save', validateSaveUserRequest, isRequestValidated, saveAUser);

module.exports = router;