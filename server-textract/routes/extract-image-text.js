var express = require('express');
var router = express.Router();
var textract = require('textract');

/* GET extract text image. */
router.get('/', function(req, res, next) {

    //console.log("req.query.imageURL: " + req.query.imageURL);

    textract.fromUrl(req.query.imageURL, function( error, text ) {
        //console.log(error);
        //console.log(text);
        if ((error === null) && (text != " ")) {
            return res.json({success: true, text: text, message: "Text Extract OK."});
        }
        if ((typeof text == "undefined") || (text == " ")) {
            return res.json({success: false, text: '', message: "Error Text Extract."});
        }
        return res.json({success: false, text: '', message: "Error Text Extract."});
    })
})

module.exports = router;
