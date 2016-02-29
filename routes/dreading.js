var router = require('express').Router();
var AV = require('leanengine');

var request=require("request");
var fs = require('fs');
var extractor = require('unfluff');

var Article = AV.Object.extend('Article');

router.get('/', function(req, res, next) {
    var url = "http://news.stanford.edu/news/2016/february/ed-mccluskey-obit-022516.html";
    request(url,function(error, response, body){
        var data = extractor(body);

        var article = new Article();
        article.set('title', data.title);
        article.set('content', data.text);
        article.set('imageUrl', data.image);
        article.set('description', data.description);

        var postTime = data.date ? new Date(data.date.substring(0, 19)) : new Date();
        article.set('postTime', postTime);
        article.set('url', url);
        article.set('from', 'HackerNews');
        article.save(null, {
            success: function (result) {
                console.log(result);
            }, error: function (err) {
                next(err);
            }
        });

    });

    res.render('dreading', {
        title: 'DReading'
    });
});


module.exports = router;
