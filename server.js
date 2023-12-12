const express = require('express'); // Importing express module
const app = express(); // Creating an express object
const port = 8000;  // Setting an port for this application
const cors = require('cors');
const pdfShift = require('./routes/pdfshift-routes');
const pdfPuppeteer = require('./routes/puppeter-routes');


app.options('*', cors())
app.use('/convert', pdfShift);
app.use('/convert-via-puppeteer', pdfPuppeteer);

// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})
