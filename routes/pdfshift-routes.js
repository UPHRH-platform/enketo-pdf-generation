
const express = require("express");
const router = express.Router();
const pdfcrowd = require('pdfcrowd')
const path = require('path')
// PDF Shift
// Home page route.
router.get("/pdf", (req, res) =>{
    // create the API client instance
    var client = new pdfcrowd.HtmlToPdfClient("bharathdsi", "50919e20895f45dfbb3d27967348e9af");
 var fileName="nursing.pdf"
    // configure the conversion
    try {
        client.setNoMargins(true);
        client.setUseMobileUserAgent(true);
        client.setCustomJavascript("libPdfcrowd.removeZIndexHigherThan({zlimit: 90});");
        client.setViewportWidth(600);
        client.setRenderingMode("viewport");
        client.setSmartScalingMode("viewport-fit");
    } catch(why) {
        // report the error
        console.error("Pdfcrowd Error: " + why);
        process.exit(1);
    }
    const options = {
        root: path.join('./')
    };
    // run the conversion and write the result to a file
    client.convertUrlToFile(
        req.query.url,
        fileName,
        
        function(err, fileName) {
            if (err) return console.error("Pdfcrowd Error: " + err);
            console.log("Success: the file was created " + fileName);
        });
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
    });

    module.exports= router