const mongoose = require('mongoose')

//post schema
const postSchema = new mongoose.Schema({
    post_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comment:{
        type: Array,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Posts", postSchema)