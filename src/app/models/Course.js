const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoID: { type: String },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  { timestamps: true }
);

// Add plugin
Course.plugin(mongooseDelete, { deletedAt : true });
Course.plugin(mongooseDelete, { overrideMethods: 'all' });
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
