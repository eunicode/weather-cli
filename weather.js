// Include the https module
const https = require('https');

// Include querystring module
const querystring = require('querystring');

// Require a json file
const api = require('./api.json');

// Print out temp details
function printWeather(weather) {
    // `weather` is the parsed JSON object returned from OWM API.
    const message = `Current temperature in ${weather.name} is ${weather.main.temp}F`;
    console.log(message);
}

// Print out error message

// Retrieve data from Open Weather Map API
function get(query) {

    const parameters = {
        APPID: api.key,
        units: 'imperial',
        zip: `${parseInt(query)},us`
    };

    // Build API endpoint
    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;
    // The querystring.stringify() method produces a URL query string from a 
    // given obj by iterating through the object's "own properties" 
    // i.e. URL encodes a parameters object (Source: docs).
    console.log(url);
    // https://api.openweathermap.org/data/2.5/weather?APPID=999999999&units=imperial&zip=90012%2Cus

    const request = https.get(url, (response) => {
    // https.get(options[, callback]) is similar to http.request(). 
    // The only difference between this method and http.request() is that it's
    // for HTTPS, sets the method to GET, and calls req.end() automatically. 

    // `options` can be an object, a string, or a URL object. If options is a 
    // string, it is automatically parsed with url.parse() (Source: docs).

    // Note that the callback must take care to consume the response data for reasons stated in http.ClientRequest section.
    // The callback is invoked with a single argument that is an instance of
    // http.IncomingMessage. 
    // An IncomingMessage object is created by http.Server or http.ClientRequest
    // and passed as the first argument to the 'request' and 'response' event 
    // respectively. It may be used to access response status, headers and data
    // (Source: docs).

    // Returns: <http.ClientRequest>

        // Continuously update stream with data
        let body = "";

        // Read the data
        // Another chunk of data has been recieved, so append it to `body`
        response.on('data', (chunk) => {
            body += chunk;
        });

        // The whole response has been recieved, so we just print it out here
        response.on('end', () => {
            // console.log(body);

            // node app.js 90012

            // {
            //     "coord":{"lon":-118.24,"lat":34.05},
            //     "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
            //     "base":"stations",
            //     "main":{"temp":80.22,"pressure":1014,"humidity":64,"temp_min":69.8,"temp_max":91.4},
            //     "visibility":16093,
            //     "wind":{"speed":6.93,"deg":270},
            //     "clouds":{"all":1},
            //     "dt":1531533480,
            //     "sys":{"type":1,"id":416,"message":0.0053,"country":"US","sunrise":1531572734,"sunset":1531623914},
            //     "id":420003772,
            //     "name":"Los Angeles",
            //     "cod":200
            // }

            // Parse data
            const weather = JSON.parse(body);

            // Print data
            printWeather(weather);
        });
    });

}

// Export `get` function
module.exports.get = get;

//TODO: Handle any errors