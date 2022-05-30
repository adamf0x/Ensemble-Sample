const express = require("express")
const app = express()
const port = 3000
const bodyparser = require("body-parser")
const movieController = require("./Movies/movie_routes")

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use("/api", movieController);

const db = require("./db/config")

try {
  db.sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("*", (req, res)=>{
  res.send("Hello World!");
})


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app