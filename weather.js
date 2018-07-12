// Include the https module
const https = require('https');

// Require a json file
const api = require('./api.json');

// Print out temp details
// Print out error message

// Retrieve data from Open Weather Map API
function get(query) {
    // Build API endpoint
    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;
    // The querystring.stringify() method produces a URL query string from a 
    // given obj by iterating through the object's "own properties" 
    // or URL encodes a parameters object. (Source: docs)
    console.log(url);

    const request = https.get(url, response => {
        let body = "";

        // Read the data
        response.on('data', chunk => {
            body += chunk;
        });

        response.on('end', () => {
            console.log(body);
            // Parse data
            // Print data
        });
    });

}

// Export `get` function
module.exports.get = get;

//TODO: Handle any errors