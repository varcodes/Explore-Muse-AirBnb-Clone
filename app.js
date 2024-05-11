const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Connect to the database
const MONGO_URL = "mongodb://127.0.0.1:27017/explore-muse";
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

//Index Route
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit", async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//Update Route
app.put("/listings/:id", async(req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id", async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
    console.log(deletedListing);
})

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

app.get("/", (req, res) => {
    res.send("Hey, I am root");
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})



// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Sample Home",
//         desc: "This is a sample home",
//         price: 1200,
//         location: "New Delhi",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send(sampleListing);
// })