const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const appiKey = "c78df5861abfa4e305d43998ae9967e6";
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appiKey + "&units=metric"
    http.get(url, function (response) {
        console.log(response.statusCode);


        response.on("data", function (data) {
            const weatherApp = JSON.parse(data);
            console.log(weatherApp);
            console.log("dsdc " + weatherApp.weather[0].description);
            const desc = weatherApp.weather[0].description;
            const temp = weatherApp.main.temp;
            const name = weatherApp.name;
            const icon = weatherApp.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather is currently " + desc + "</h1>");
            res.write("<p>The temperature is " + name + " " + temp + "degrees Celcius</p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
});



app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})
