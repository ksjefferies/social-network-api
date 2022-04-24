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

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserId).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendId').delete(deleteFriendFromUser);
router.route('/:id/friends/').post(addFriendToUser)
module.exports = router;