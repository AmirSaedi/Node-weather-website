const request = require("request");
const forecast = (longitude, latitude, location, callback) => {
    const forecastURL =
        `https://api.darksky.net/forecast/7918a3b8b5211f52d5c3f1dfc9a403f0/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({
            url: forecastURL,
            json: true
        },
        (error, {
            body
        }) => {
            if (error) {
                callback("Unable to connect to weather service!", undefined);
            } else if (body.error) {
                callback("Unable to find location!", undefined);
            } else {
                callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    chanceOfRain: body.currently.precipProbability,
                    location
                });
            }
        }
    );
};

module.exports = forecast;