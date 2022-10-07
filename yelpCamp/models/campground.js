const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review");

//We moved all image schema data to its own Schema
const imageSchema = new Schema({ url: String, filename: String });

//A virtual property for each image for thumbnail when editing camp
//Only the original image is in our images db, not the thumbnail version
//We now have access to img.thumbnail in our edit views
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  //The way MapBox does it is with location instead of geometry
  //But we already have location in use.
  geometry: {
    type: {
      type: String,
      //This has to be Point, a part of the geometry object.
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: String,
  location: String,
  // image: String,
  //Changes after working uploading of files
  //Each file object has:
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },

  // images: [{ url: String, filename: String }],
  //Images now takes an array of imageSchema images instead
  images: [imageSchema],
});

//Our mongoose middleware to delete all specific campground reviews
//upon campground deletion

//We must check what Mongoose method is triggered based on the method we use
//ourselves in the app paths
campgroundSchema.post("findOneAndDelete", async (doc) => {
  // console.log(doc);
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);
