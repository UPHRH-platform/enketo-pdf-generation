
const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
var bodyParser = require('body-parser');
const cors = require('cors');
var jsonParser = bodyParser.json()

router.post("/pdfpuppeteer", cors(), jsonParser, async (req, res) =>{
    const browser = await puppeteer.launch({ headless: true, devtools: false, args: [

        "--no-sandbox",

        "--disable-gpu",

    ] });
        const page = await browser.newPage();
        console.log('qwertyuio', req.body)
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
        await page.setViewport({
          width: 375,
          height: 667,
          isMobile: true
        });
        await page.goto(req.body.url, {
          waitUntil: 'networkidle2',
        });

        // page.pdf() is currently supported only in headless mode.
        // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
        let bufferData = await page.pdf({
          path: '123422222567.pdf',
          format: 'A4',
          margin: {
            top:'50',
            right:'50',
            bottom:'50',
            left:'50'
          }
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers',  'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.send(bufferData.toString('base64'))

        await browser.close();
      
});

module.exports= router