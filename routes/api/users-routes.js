const router = require('express').Router();

// Use user-controller functions
const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriendToUser,
    deleteFriendFromUser
} = require('../../controllers/user-controller');

// Get all users, Create User
// Path: 'localhost:3001/api/users'
router.route('/').get(getAllUsers).post(createUser);

// Get User by ID, Update user, Delete user
// Path: 'localhost:3001/api/users/:id'
router.route('/:id').get(getUserId).put(updateUser).delete(deleteUser);

// Delete friend from user
// Path: 'localhost:3001/api/users/:id/friends/:friendId'
router.route('/:id/friends/:friendId').delete(deleteFriendFromUser);

// Add friend to user
// Path: 'localhost:3001/api/users/:id/friends/'
router.route('/:id/friends/').post(addFriendToUser)

module.exports = router;