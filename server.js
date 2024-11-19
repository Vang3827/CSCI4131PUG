const express = require('express')
const app = express()
const pug = require('pug');

const listings = [
  {
    vehicle: "Dodge Challenger",
    url: "https://images.unsplash.com/photo-1632686341369-8a7991237930?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Longer text for descrption",
    category: "small",
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
    category: "small",
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


app.use("/css", express.static("resources/css/"))
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
  // console.log(req.query)
  // console.log(Object.values(listings).includes("Toyota"))
  // console.log(listings)

  if (Object.keys(req.query).length > 0) {
    const queryTerm = req.query.query;
    const category = req.query.category;
    console.log("this is the queryTerm:",queryTerm);
    console.log("this is the category:",category);
    const lowerQuery = queryTerm.toLowerCase();
    const lowerCategory = category.toLowerCase();
    console.log("Lowercase: ", lowerQuery);
    // console.log("Lowercase Category", )
    //checking values
    for (let listing in listings){
      vechicleLower = listings[listing].vehicle.toLowerCase()
      categoryLower = listings[listing].category.toLowerCase()
      console.log("Vehicle listing --> ", vechicleLower);
      console.log("Catagory lower ---> ", categoryLower);
      console.log("This: ", categoryLower, " That: ",lowerCategory)
      if(vechicleLower.includes(lowerQuery)){
        console.log("in for loop");
        // console.log(listings[listing].vehicle)
        console.log(vechicleLower,"==",lowerQuery);
        
      } else if(categoryLower.includes(lowerCategory)){
        console.log("In else loop for Category")
        console.log(categoryLower,"==", category);
      }
    }

    const pugTemplate = `
doctype html
head
  meta(charset='UTF-8')
  meta(name='viewport' content='width=device-width, initial-scale=1.0')
  link(rel='stylesheet' href='css/main.css')
  title Auto Auction
  script(defer='' src='js/table.js')
form.topnav(action='gallery' method='get')
  a(href='/') About
  a(href='/gallery') Gallery
  input(name='query' type='search' placeholder='Search..')
  select#cars(name='category')
    option None
    option(value='coupe') Coupe
    option(value='truck') Truck
    option(value='suv') SUV
  input(type='submit' value='Submit')
h1.listingh Auto Auction list
  `;
    const renderPug = pug.render(pugTemplate)
    res.send(renderPug)
    

    // res.render('gallery', { renderQuery: queryTerm, renderCategory: category });
  } else {
    console.log("render gallery without query");

    res.render('gallery' ,{listings});
  }
})

app.get("/listing", (req,res) => {


})

app.get("/create", (req, res) => {
  res.render("create.pug", (req, res))
})

app.post("/create", (req, res) => {
  res.render("create.pug", (req, res))
})

//app.get("listing/[id]") returns a html rendered verion of templates/listing.pug responds to a query and category
//res.render ??

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})