// Require Models: (Thoughts, Users)
const { Thoughts, Users } = require('../models');

// Setup thoughtController to contain all thought functions
const thoughtController = {

    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thought = await Thoughts.find({})
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },

    // Get thoughts of single user
    async getThoughtById({ params }, res) {
        try {
            const thought = await Thoughts.findOne({ _id: params.thoughtId })
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')

            if (!thought) {
                res.status(404).json({ message: 'No thought found.' });
                return
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        };
    },

    // Create new thought
    async createThought({ params, body }, res) {
        try {
            const thought = await Thoughts.create(body)
            const dbThoughtsData = await Users.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: thought._id } }, { new: true })

            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with that ID.' })
                return;
            }
            res.json(dbThoughtsData)
        } catch (err) {
            res.json(err)
        };
    },

    // Update thought
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true })
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID.' })
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        };
    },

    // Delete thought
    async deleteThought({ params }, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: params.thoughtId })

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this ID.' })
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        };
    },

    // Create new reaction
    async createReaction({ params, body }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { runValidators: true, new: true })
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')

            if (!thought) {
                res.status(404).json({ message: 'No thoughts with that ID.' })
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err)
        };
    },

    // Delete reaction
    async deleteReaction({ params }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })

            if (!thought) {
                res.status(404).json({ message: 'Invalid Request' })
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        };
    }
};

module.exports = thoughtController;