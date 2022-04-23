const { Schema, model } = require('mongoose');
const moment=require('moment');

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
        }


    }
);