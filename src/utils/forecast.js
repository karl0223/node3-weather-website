const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=13620f1135a5265d152b0a1abd852222&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  //   console.log(url);

  if (!isNaN(latitude) && !isNaN(longitude)) {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to weatherstack service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        const weatherDesc = body.current.weather_descriptions[0];
        const temperature = body.current.temperature;
        const feelsLike = body.current.feelslike;
        const precip = body.current.precip;
        const humidity = body.current.humidity;
        callback(
          undefined,
          weatherDesc +
            ". It is currently " +
            temperature +
            " degrees out. It feels like " +
            feelsLike +
            " degrees out. " +
            "There is a " +
            precip +
            "% chance of rain." +
            "The humidity is " +
            humidity +
            "%."
        );
      }
    });
  } else {
    callback("Please enter a valid latitude and longitude coordinates");
  }
};

module.exports = forecast;
