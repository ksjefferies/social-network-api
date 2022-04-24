const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create virtual property that retrieves the length of the users 'friends' array on query.
UsersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const Users = model('Users', UsersSchema);

module.exports = Users;