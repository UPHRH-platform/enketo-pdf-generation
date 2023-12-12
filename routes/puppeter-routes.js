
const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
var bodyParser = require('body-parser');
const cors = require('cors');
var jsonParser = bodyParser.json()

router.post("/pdfpuppeteer", cors(), jsonParser, async (req, res) =>{
    const browser = await puppeteer.launch({ headless: "new", devtools: true, args: [

        "--no-sandbox",

        "--disable-gpu",

    ] });
        const page = await browser.newPage();
        console.log('qwertyuio', req.body)
        await page.goto(req.body.url, {
          waitUntil: 'networkidle2',
        });
        // page.pdf() is currently supported only in headless mode.
        // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
        let bufferData = await page.pdf({
          path: '123422222567.pdf',
          format: 'A4',
        });
        res.send(bufferData.toString('base64'))

        await browser.close();
      
});

module.exports= router
