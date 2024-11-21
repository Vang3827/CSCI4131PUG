const express = require('express')
const app = express()
const pug = require('pug');

const listings = [
  {
    vehicle: "Dodge Challenger",
    url: "https://images.unsplash.com/photo-1632686341369-8a7991237930?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "This blue Dodge Challenger offers an unbeatable combination of striking looks and heart-pounding performance. With its powerful engine and sleek design, it delivers an exhilarating driving experience that’s sure to turn heads. Don't miss the chance to own this iconic muscle car and make a statement on the road today!",
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
    description: "Experience the thrill of driving with this iconic Ford Mustang, a true American muscle car. Its bold design and powerful engine make every drive an adventure, while the comfortable interior ensures you enjoy the ride. Take the wheel of this classic Mustang and feel the power and precision with every mile!",
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
    description: "The Toyota Tundra is built for both work and adventure, offering impressive towing capacity and rugged durability. With its spacious interior and advanced features, this truck provides comfort for long drives while handling tough tasks with ease. Whether you're hauling gear or cruising the highway, the Tundra is ready for anything",
    category: "truck",
    numericID: 3,
    date: "09/10/2024",
    bids: [
      { bidder: "Adam Apple", bidAmount: 6500, comment: "Work truck." },
      { bidder: "Ben Benji", bidAmount: 7500, comment: "New truck for me." },
      { bidder: "Cedar Cider", bidAmount: 9500, comment: "The Cedar Mobile." }
    ]
  },
  {
    vehicle: "Subaru Outback",
    url: "https://images.unsplash.com/photo-1609772168547-d216c44c3f85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The Subaru Outback is the perfect blend of adventure and comfort, offering all-wheel drive for superior handling in any condition. With its spacious interior, high ground clearance, and fuel efficiency, it's ideal for both city driving and outdoor excursions. Reliable and versatile, the Outback is built to take you wherever the road leads",
    category: "suv",
    numericID: 4,
    date: "09/12/2024",
    bids: [
      { bidder: "Rando Bider", bidAmount: 3000, comment: "Comments Comments Comments." },
      { bidder: "SubBack", bidAmount: 9500, comment: "I just wanted to say hi." },
      { bidder: "AnotherOne", bidAmount: 1500, comment: "And another one. And another one. And another one." }
    ]
  }
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/css', express.static('resources/css'));
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
  const queryTerm = req.query.query || ''; 
  const category = req.query.category || '';

  const lowerQuery = queryTerm.toLowerCase();
  const lowerCategory = category.toLowerCase();

  const tempListing = listings.filter(listing =>
    listing.vehicle.toLowerCase().includes(lowerQuery) &&
    listing.category.toLowerCase().includes(lowerCategory)
  );

  res.render('gallery', { tempListing });
});


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
  console.log('Received request to delete:', req.body);

  const { listing_id } = req.body;

  if (!listing_id) {
      console.log('Missing listing_id');
      return res.status(400).json({ message: 'Missing listing_id' }); // Make sure to return here
  }

  const listingIndex = listings.findIndex(l => l.numericID === parseInt(listing_id));

  if (listingIndex === -1) {
      console.log(`Listing with ID ${listing_id} not found`);
      return res.status(404).json({ message: 'Listing not found' }); // Make sure to return here as well
  }

  // Delete listing and send success response
  listings.splice(listingIndex, 1);
  console.log(`Listing with ID ${listing_id} deleted`);
  res.json({ message: 'Listing successfully deleted' });
});



app.all('*', (req, res) => {
  res.status(404).render('404');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})