var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var multer = require("multer");
var upload = multer({ dest: './uploads/'}).single('file');
var config = require('../config/settings');


/* POST upload image to cloudinary service. */
router.post('/', function(req, res, next) {

    // Multer.
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading.
            console.log(err);
        }

        //console.log(req.file);

        // Upload to Cloudinary.
        cloudinary.config({
            cloud_name: config.cloud_name,
            api_key: config.api_key,
            api_secret: config.api_secret
        });

        cloudinary.uploader.upload(
            req.file.path,
            function (result) {
                //console.log(result);
                //console.log(result.secure_url);

                if (result) {
                    return res.send(result.secure_url);
                }
            }
        );
    });
});

module.exports = router;
