// Require Models: (Thoughts, Users)
const { Users, Thoughts } = require('../models');

// Setup user controller to contain all user functions
const userController = {

    // Get all users
    async getAllUsers(req, res) {
        try {
            const user = await Users.find({})
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v')
            res.json(user)
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get a single user
    async getUserId({ params }, res) {
        try {
            const user = await Users.findOne({ _id: params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v')

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            };
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        };
    },

    // Create a new user
    async createUser({ body }, res) {
        try {
            const user = await Users.create(body);
            res.json(user);
        } catch (err) {
            res.status(400).json(err)
        };
    },

    // Update a user
    async updateUser({ params, body }, res) {
        try {
            const user = await Users.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })

            if (!user) {
                res.status(404).json({ message: 'No users found with this ID.' })
                return;
            }
            res.json(user)
        } catch (err) {
            res.json(err)
        };
    },

    // Delete a user and all associated thoughts
    async deleteUser({ params }, res) {
        try {
            const user = await Users.findOneAndDelete({ _id: params.id })
            await Promise.all(user.thoughts.map((thought) => Thoughts.findOneAndDelete({ _id: thought })))

            if (!user) {
                res.status(404).json({ message: 'No users found with this ID.' })
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        };
    },

    // Add a friend to a user
    async addFriendToUser({ body, params }, res) {
        try {
            const user = await Users.findOneAndUpdate({ _id: params.id }, { $push: { friends: body.id } }, { new: true })
                .populate({ path: 'friends', select: ('-__v') })
                .select('-__v')

            if (!user) {
                res.status(404).json({ message: 'No user with this ID found.' })
                return;
            }
            res.json(user);
        } catch (err) {
            res.json(err);
        };
    },

    // Delete a friend from a user
    async deleteFriendFromUser({ params }, res) {
        try {
            const user = await Users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v')

            if (!user) {
                res.status(404).json({ message: 'No user with this ID found.' })
                return;
            }
            res.json(user)
        } catch (err) {
            res.status(400).json(err);
        };
    }
};

module.exports = userController;