//Headlines Model Creation//
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//Headline Schema with ObjectID linking to Comment Model //
var HeadlineSchema = new Schema({
    //"unique:true" ensures new Articles are being scraped each time//    
    title: {
        type: String,
        required: true,
        unique: true
    },
    byline: {
        type: String,
        requierd: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    },
    img: {
        data: Buffer,
        contentType: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

//Model Creating  using Mongoose's Model method//
var Headlines = mongoose.model("Headlines", HeadlineSchema);

//Makes the Headline Model exportable//
module.exports = Headlines;