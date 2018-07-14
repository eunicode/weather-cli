// Import weather module
const weather = require('./weather');

// Format user query
const query = process.argv.slice(2).join(' ');
// `process` is a global object that provides information about, and control over,
// the current Node.js process. (Source: docs)

// The process.argv property returns an array containing the command line 
// arguments passed when the Node.js process was launched. 
// The first element will be process.execPath. 
// The second element will be the path to the JavaScript file being executed. 
// The remaining elements will be any additional command line arguments. 
// (Source: docs)

// Pass user query and call the weather module's `get` function
weather.get(query);