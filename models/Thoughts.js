// Require Mongoose and moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Create new schema for reactions
const ReactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
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
        },
        _id: false,
        id: false
    }
);

// Create new schema for thoughts
const ThoughtsSchema = new Schema(
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
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create virtual property to store count of reactions 
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

// Export module: Thoughts
module.exports = Thoughts;