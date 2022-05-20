const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.n1;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=5c2e6046a3aa65c5996bf44d21948b29#"
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const t = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>Temperature in " + query + " is :" + " " + t + " degree celsius.</h1>");
      res.write("<p>Weather description : " + weatherData.weather[0].description + "</p>");
      res.write("<img src=" + imgUrl + ">")
      res.send();

    })
  })


})



app.listen("3000", function(req, res) {
  console.log("listening");
});
