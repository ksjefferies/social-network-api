const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId(),
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM D, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 128
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM D, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create virtual property that gets the length of thoughts reactions array
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;