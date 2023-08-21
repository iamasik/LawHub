const mongoose = require("mongoose");

const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter your gig title.."],
    maxlength: [200, "Title must have with in 200 char.."],
  },
  catagory: {
    type: mongoose.Schema.ObjectId,
    //Always use original name that exist the same name in database
    ref: "categories",
    required: [true, "Must have a Category"],
  },
  price: {
    type: Number,
    required: [true, "Please enter your gig price.."],
    validate: [
      function () {
        return this.price > 100;
      },
      "Please increse price above 100",
    ],
  },
  keywords: {
    type: String,
    required: [true, "Please enter your gig keyword.."],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter your gig description.."],
    maxlength: [1200, "Title must have with in 200 char.."],
  },
  level: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Must have a User"],
  },
});

//Populating Order referance info while viewing them
GigSchema.pre(/^find/, function (next) {
  this.populate({
    path: "catagory userId",
  });
  next();
});

const Gigs = mongoose.model("Gigs", GigSchema);
module.exports = Gigs;
