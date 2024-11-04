const router = require('express').Router();

router.use('/events', require('../routes/api/events.routes'));
router.use('/users', require('../routes/api/users.routes'));
module.exports = router;