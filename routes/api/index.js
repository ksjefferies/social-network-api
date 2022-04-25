// Require express router
const router = require('express').Router();

// establish routes (thoughts and users)
const thoughtsRoutes = require('./thoughts-routes');
const usersRoutes = require('./users-routes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

// Export module: router
module.exports = router;