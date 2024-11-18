const express = require('express')
const app = express()

app.use("/css", express.static("css/"))
app.set("views", "templates");
app.set("view engine", "pug");

const port = 4131

app.get("/", (req, res)=>{
    res.render("main.pug")
})

app.get("/main", (req, res)=>{
  res.render("main.pug")
})

app.get("/gallery", (req, res)=>{
  console.log(req.query)
  const queryTerm = req.query.query
  const category = req.query.category

  // res.send(`Search Query: ${queryTerm}, Category: ${category}`);
  res.render('gallery', { renderQuery: queryTerm, renderCategory:category});
})

app.get("/create", (req, res)=>{
  res.render("create.pug",(req,res))
})

app.post("/create", (req, res)=>{
  res.render("create.pug",(req,res))
})

//app.get("listing/[id]") returns a html rendered verion of templates/listing.pug responds to a query and category
//res.render ??

app.listen(port , () => {
  console.log(`Example app listening on port ${port}`)
})