import mongoose from "mongoose";

const msgschema = mongoose.Schema(
    {
        Message: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Msg = mongoose.model('Cat', msgschema);