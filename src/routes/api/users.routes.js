const { CreateOrganizator, loginUser } = require('../../controllers/api/users.controllers');

const router = require('express').Router();




router.post('/register', CreateOrganizator);
router.post('/login', loginUser);

module.exports = router;