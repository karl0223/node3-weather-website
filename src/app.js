const path = require("path");
const express = require("express");
const hbs = require("hbs");

const positionCode = require("./utils/positionCode");
const forecast = require("./utils/forecast");

const app = express();

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Karl Ducta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Karl Ducta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need Help?",
    message: "This is the help page",
    name: "Karl Ducta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  positionCode(
    req.query.address,
    (error, { latitude = 0, longitude = 0, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          const data = {
            forecast: forecastData,
            location,
            address: req.query.address,
          };
          console.log(data);

          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
    name: "Karl Ducta",
    title: "404",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found.",
    name: "Karl Ducta",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is up in port 3000");
});
