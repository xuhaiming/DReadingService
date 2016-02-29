var router = require('express').Router();
var AV = require('leanengine');

var request=require("request");
var fs = require('fs');
var extractor = require('unfluff');

router.get('/', function(req, res) {
    request("http://www.bbc.com/news/entertainment-arts-35670715",function(error,response, body){
        var data = extractor(body);
        console.log(data.title);
    });

    res.render('dreading', {
        title: 'DReading'
    });
});


module.exports = router;
