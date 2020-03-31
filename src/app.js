const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Amir Saedi"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Add address term"
        });
    }

    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(longitude, latitude, location, (error, {
            summary,
            temperature,
            chanceOfRain
        }) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                location,
                address: req.query.address,
                forecast: {
                    summary,
                    temperature,
                    chanceOfRain
                }
            });
        });
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "This is about page",
        name: "Amir Saedi"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "This is help page",
        name: "Amir Saedi"
    });
});

app.get("/about/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Amir Saedi",
        errorMassage: "About subpage not found!"
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Amir Saedi",
        errorMassage: "Help article not found!"
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Amir Saedi",
        errorMassage: "Page not found!"
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});