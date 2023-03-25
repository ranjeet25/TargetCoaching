const mongoose = require("mongoose");

const BatcheSchema = new mongoose.Schema({
  batch_name: String,
  batch_time: String,
  batch_course: String,
  batch_incharge: String,
});

BatchesModel = mongoose.model("BatchesInfo", BatcheSchema);

module.exports = BatchesModel;
