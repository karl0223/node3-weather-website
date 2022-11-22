const request = require("request");

const positionCode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=5dd50d2f8f2cc449f5ca815dc13c2ef9&query=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, { body }) => {
    // console.log(response.body);
    // console.log(response.body.data.length === 0);
    if (error) {
      callback("Unable to connect to Position stack services!", undefined);
    } else if (!body.data || body.data.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
      });
    }
  });
};

module.exports = positionCode;
