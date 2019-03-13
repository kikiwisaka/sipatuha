const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technology: {
        type: [String],
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);