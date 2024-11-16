const express = require('express')
const app = express()

app.use("/css", express.static("css/"))
app.set("views", "resources");
app.set("view engine", "pug");

const port = 4131

app.get("/", (req, res)=>{
    res.render("main.pug")
})


app.listen(port , () => {
  console.log(`Example app listening on port ${port}`)
})