const mongoose = require('mongoose')

const Task = mongoose.model("Task", {
  summary: String,
  description: String,
  priority: String,
  status: String,
  projectID: String
});

module.exports = Task;
