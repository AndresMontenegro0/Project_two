var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wikiSchema = Schema({
    author: String,
    title: {type: String, required: true},
    content: String,
    category: String,
    created_at:{type: Date, default: Date},
    updated_at: {type: Date, default: Date.now},
});

var Wiki = mongoose.model("Wiki", wikiSchema);

module.exports = Wiki;