const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    tag: {
        type: String,
        trim: true,
        
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("notes", NotesSchema);
