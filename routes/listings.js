const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");

const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Validate Schema
//Listing
const validateListingSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index Route
router.get("/", wrapAsync(listingControllers.index));

//Create Route
router.get("/new", isLoggedIn, listingControllers.renderCreateForm);

router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListingSchema,
  wrapAsync(listingControllers.createListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListingSchema,
  wrapAsync(listingControllers.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.deleteListing)
);

//Show Route
router.get("/:id", wrapAsync(listingControllers.showListing));

module.exports = router;
