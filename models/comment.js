//Notes Model//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentSchema = new Schema({
       _headlineId: {
              type: Schema.Types.ObjectId,
              ref: "Headline"
       },
       date: String,
       commentBody: String
});

//Model Creating  using Mongoose's Model method//
var Comment = mongoose.model("Comment", commentSchema);

//Makes the CommentModel exportable//
module.exports = Comment;