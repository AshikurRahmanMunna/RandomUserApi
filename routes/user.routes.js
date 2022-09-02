const router = require('express').Router();
const { getARandomUser, getAllUsers, saveAUser, updateUser } = require('../controllers/user.controller');
const { validateSaveUserRequest, isRequestValidated } = require('../validators/user.validators');

router.get('/random', getARandomUser);
router.get('/all', getAllUsers);
router.post('/save', validateSaveUserRequest, isRequestValidated, saveAUser);
router.patch('/update', updateUser);

module.exports = router;