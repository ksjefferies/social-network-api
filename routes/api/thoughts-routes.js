const router = require('express').Router();

// Use thought-controller functions
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Get all thoughts
// Path: 'localhost:3001/api/thoughts/'
router.route('/').get(getAllThoughts);

// Get thought by ID, Update thought, Delete thought
// Path: 'localhost:3001/api/thoughts/:thoughtId'
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Create thought
// Path: 'localhost:3001/api/thoughts/:userId'
router.route('/:userId').post(createThought);

// Create reaction
// Path: 'localhost:3001/api/thoughts/:thoughtId/reactions'
router.route('/:thoughtId/reactions').post(createReaction);

// Delete reaction
// Path: 'localhost:3001/api/thoughts/:thoughtId/:reactionId'
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;