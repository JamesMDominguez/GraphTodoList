const mongoose = require('mongoose')

const Project = mongoose.model("Project", {
  name: String,
  user: String
});

module.exports = Project;
