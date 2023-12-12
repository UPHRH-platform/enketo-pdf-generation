const express = require('express'); // Importing express module
const app = express(); // Creating an express object
const port = 8000;  // Setting an port for this application
const cors = require('cors');

const pdfDownloader = require('./routes/routes');

const options = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
  };
app.options('*', cors(options))
app.use('/convert-via-puppeteer',cors(options), pdfDownloader);
app.use('/download',cors(options), pdfDownloader);

// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})