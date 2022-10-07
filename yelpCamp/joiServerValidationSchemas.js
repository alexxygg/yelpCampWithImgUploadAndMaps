const Joi = require("joi");
const joi = require("joi");
module.exports.campgroundSchema = joi.object({
  campground: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      location: joi.string().required(),
      price: joi.number().required().min(0),
      //DUE TO IMAGE UPLOADING
      //Since we can only access req.files attributes
      //after images have been uploaded, we can not require them.
      //Validating them will be off.
      // image: joi.string().required(),

      //Any image checked by user when editing campground will be
      //deleted, it will be added to an array we called deleteImages[]
    })
    .required(),
  //Outside to not require user deleting an image/images
  //when editing/updating campground, rest IS required.
  deleteImages: joi.array(),
});

//Review Validation Server-side
module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      body: joi.string().required(),
    })
    .required(),
});
