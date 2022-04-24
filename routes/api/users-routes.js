const router = require('express').Router();

const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriendToUser,
    deleteFriendFromUser
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserId).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').delete(deleteFriendFromUser);

// /api/users/:id/friends/
router.route('/:id/friends/').post(addFriendToUser)

module.exports = router;