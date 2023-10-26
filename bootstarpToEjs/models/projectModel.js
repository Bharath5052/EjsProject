const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    subProjects: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description: {
                type: String
            },
            liveDemoLink: {
                type: String
            },
            sourceCodeLink: {
                type: String
            }
        }
    ]
}
);

module.exports = mongoose.model('samples', projectSchema);
