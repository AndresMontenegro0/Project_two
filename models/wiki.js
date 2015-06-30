var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wikiSchema = Schema({
    author: String,
    title: {type: String, required: true},
    content: String
});

var Wiki = mongoose.model("Wiki", wikiSchema);

module.exports = Wiki;