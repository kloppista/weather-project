const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + MY_KEY + "&units=" + unit + "";

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL= "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDesc + "</p>");
            res.write("<h1>The weather in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

var mykey = config.MY_KEY;


app.listen(3000, function() {
    console.log("Server running on port 3000");
}) 