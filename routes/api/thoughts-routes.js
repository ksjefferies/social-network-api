const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getAllThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId
router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;