// Require express router
const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => res.status(404).send('Incorrect route...'));

// Export module: router
module.exports = router;