const { propfind } = require('../../tech-blog/controllers/home-routes');
const Users = require('../models/Users');

const userController = {
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
    async getUserId({ params }, res) {
        try {
            const user = await Users.findOne({ _id: params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select(-__v)

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            };
            res.json(user);
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        };
    },
    async createUser({ body }, res) {
        try {
            const user = new Users.create(body);
            res.json(user);
        } catch (err) {
            res.status(400).json(err)
        };
    },
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
    async deleteUser({ params }, res) {
        try {
            const user = await Users.findOneAndDelete({ _id: params.id })

            if (!user) {
                res.status(404).json({ message: 'No users found with this ID.' })
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        };
    },
    async addFriendToUser({ params }, res) {
        try {
            const user = await Users.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
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