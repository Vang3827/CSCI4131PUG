const express = require('express')
const app = express()
const pug = require('pug');

const listings = [
  {
    vehicle: "Dodge Challenger",
    url: "https://images.unsplash.com/photo-1632686341369-8a7991237930?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Longer text for descrption",
    category: "coupe",
    numericID: 1,
    date: "08/20/2024",
    bids: [
      { bidder: "Carl k", bidAmount: 4500, comment: "I would love this car." },
      { bidder: "Sam Samson", bidAmount: 5500, comment: "I just want to use money." }
    ]
  },
  {
    vehicle: "Ford Mustang",
    url: "https://images.unsplash.com/photo-1610378985708-ac6de045f9f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Longer text for descrption",
    category: "coupe",
    numericID: 2,
    date: "09/15/2024",
    bids: [
      { bidder: "Luke Lukenson", bidAmount: 2500, comment: "Dailer driver right here." },
      { bidder: "Peter Porker", bidAmount: 6500, comment: "" }
    ]
  },
  {
    vehicle: "Toyota Tundra",
    url: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Longer text for descrption",
    category: "truck",
    numericID: 3,
    date: "09/10/2024",
    bids: [
      { bidder: "Adam Apple", bidAmount: 6500, comment: "Work truck." },
      { bidder: "Ben Benji", bidAmount: 7500, comment: "New truck for me." },
      { bidder: "Cedar Cider", bidAmount: 9500, comment: "The Cedar Mobile." }
    ]
  }
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/resources', express.static('resources'));
app.use("/js", express.static("resources/js/"))
app.set("views", "templates");
app.set("view engine", "pug");

const port = 4131

app.get("/", (req, res) => {
  res.render("main.pug")
})

app.get("/main", (req, res) => {
  res.render("main.pug")
})

app.get("/gallery", (req, res) => {


  if (Object.keys(req.query).length > 0) {
    const queryTerm = req.query.query;
    const category = req.query.category;
    tempListing = []

    const lowerQuery = queryTerm.toLowerCase();
    const lowerCategory = category.toLowerCase();
    console.log("LowerCase Query: ",lowerQuery, "type of: ", typeof lowerQuery)
    console.log("LowerCase Category: ",lowerCategory, "type of: ",typeof lowerCategory)

    for (let listing in listings) {
      vechicleLower = listings[listing].vehicle.toLowerCase()
      categoryLower = listings[listing].category.toLowerCase()


      if (vechicleLower.includes(lowerQuery) && categoryLower.includes(lowerCategory)) {
        console.log("in for loop");
        console.log(vechicleLower, "==", lowerQuery);
        console.log(categoryLower, "==", lowerCategory);
        // console.log("Pushing this: ",listing)
        tempListing.push(listings[listing]);
      } 

    }
    console.log(tempListing);
    res.render('gallery', { tempListing });

  } else {
    console.log("render gallery without query");
    let tempListing = listings
    res.render('gallery', { tempListing });
  }
})

app.get('/listing/:id', (req, res) => {
  const listingId = parseInt(req.params.id);
  const listing = listings.find(l => l.numericID === listingId);

  if (!listing) {
    return res.status(404).render('404.pug'); // 404 page if listing is not found
  }
  listing.bids.sort((a, b) => b.bidAmount - a.bidAmount);
  res.render('listing.pug', { listing: listing });
});

app.get("/create", (req, res) => {
  res.render("create.pug", (req, res))
})

app.post('/create', (req, res) => {
  const { listingTitle, imgInput, textA, carsCat, date } = req.body;

  // Basic validation
  if (!listingTitle || !imgInput || !textA || !carsCat || !date) {
    return res.status(400).render('create_fail');
  }

  // Create new listing
  const newListing = {
    vehicle: listingTitle,
    url: imgInput,
    description: textA,
    category: carsCat,
    numericID: listings.length + 1,  // Increment the numericID
    date: date,
    bids: []
  };

  // Add new listing to internal storage (listings array)
  listings.push(newListing);
  console.log(listings);

  // Render success confirmation page
  res.render('create_success', { listing: newListing });
});


app.post('/api/place_bid', (req, res) => {
  const { bidder_name, bid_amount, comment, listing_id } = req.body;

  // Validate that required fields are present
  if (!bidder_name || !bid_amount || !listing_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Validate that the listing exists
  const listing = listings.find(l => l.numericID === parseInt(listing_id));

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found.' });
  }

  // Validate bid amount (you can adjust the validation logic as needed)
  if (parseInt(bid_amount) < 1000) {
    return res.status(400).json({ message: 'Bid amount must be at least $1000.' });
  }

  // Add the bid to the listing
  listing.bids.push({
    bidder: bidder_name,
    bidAmount: parseInt(bid_amount),
    comment: comment || 'No comment'
  });

  // Return the updated listing with the new bid
  res.json({
    message: 'Bid placed successfully!',
    newBid: {
      bidder_name,
      bid_amount,
      comment
    },
    listing: listing
  });

  listing.bids.sort((a, b) => b.bidAmount - a.bidAmount);

  res.render('listing', { listing: listing });

});

app.delete('/api/delete_listing', (req, res) => {
  const { listing_id } = req.body; // Destructure listing_id from the request body

  // Validate that the listing_id is provided
  if (!listing_id) {
    return res.status(400).json({ message: 'Missing listing_id' });
  }

  // Find the index of the listing to be deleted
  const listingIndex = listings.findIndex(l => l.numericID === parseInt(listing_id));

  // If the listing is not found
  if (listingIndex === -1) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  // Remove the listing from the array
  listings.splice(listingIndex, 1);

  // Send back a success response
  res.json({ message: 'Listing successfully deleted' });
});

app.all('*', (req, res) => {
  res.status(404).render('404');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})