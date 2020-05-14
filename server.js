//Main starting point of the application
//const express = require('express');
import express from 'express';

/*after node version 11, Cannot use import statement outside a module
import express from 'express';

for version 12, to use "import", you need:

1. run index.js as node --experimental-modules index.js (instead of node index.js)

2. put { "type": "module" } in your package.json 
    or using .mjs extension for your file instead of .js. (so index.js will be index.mjs)

*/

// const bodyParser = require('body-parser');
// const http = require('http');
// const morgan = require('morgan');


//App setup

const app = express();

//Server setup
const port = process.env.PORT || 3090;

app.listen(port,()=>{
    console.log(`app is running at port ${port}`)
})
