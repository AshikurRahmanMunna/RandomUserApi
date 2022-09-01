const router = require('express').Router();
const { getARandomUser, getAllUsers, saveAUser } = require('../controllers/user.controller');

router.get('/random', getARandomUser);
router.get('/all', getAllUsers);
router.post('/save', saveAUser);

module.exports = router;