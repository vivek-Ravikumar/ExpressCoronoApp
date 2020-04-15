const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const { http, https } = require("follow-redirects");
const unirest = require("unirest");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set("trust proxy", 1);
app.use(express.static(__dirname + "/public"));
app.use(cors());

let JSONData = {};
app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  })
  .get("/getData", (req, res) => {
    var chunks = [];

    https.get(
      "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
      response => {
        response
          .on("data", chunk => {
            chunks.push(chunk);
          })
          .on("end", () => {
            var body = Buffer.concat(chunks);
            JSONData = JSON.parse(body);
            // console.log(JSONData);
            res.send(JSONData);
          })
          .on("error", err => {
            console.error(err);
          });
      }
    );
  })
  .get("/india", (req, res) => {
    let responseObject = {};

    const request = unirest(
      "GET",
      "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india"
    );

    request.headers({
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key": "c1cff789e5mshc88487b2f1656d7p104736jsnc290aed61de2"
    });

    request.end(function(resp) {
      if (resp.error) {
        console.error();
      }

      // console.log(typeof res.body.state_wise.Sikkim);
      responseObject = resp.body.state_wise;
      //console.log(responseObject);
      res.send(responseObject);
    });
  });

app.listen(3000, () => {
  console.log("server is up");
});
