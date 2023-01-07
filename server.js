const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const {MongoClient} = require("mongodb");
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
const bodyParser = require('body-parser');
path = require('path');
app.use(express.json());
app.use(express.static(path.join('../app')));
app.use(bodyParser.urlencoded());

/*Get for full onlinegallery */
app.get('/gallery', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://ud:ud@cluster0.szg5vgf.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('luscofusco');
        db.collection('artgallery').find({}).toArray(function (findErr, art) {
            if (findErr) throw findErr;
            /*
            for (let i = 0; i < art.length; i++) {
                console.log("tres");
                console.log(art[i]);
            }*/
            res.render('gallery.ejs', {artList:art} );

            client.close();
        });
    });

});

/*Get with only the pieces owned by the gallery */
app.get('/galleryShop', (req, res, next) => {
    var MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://ud:ud@cluster0.szg5vgf.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('luscofusco');
        db.collection('artgallery').find({ ownedBy: "Luscofusco" }).toArray(function (findErr, art) {
            if (findErr) throw findErr;

            res.render('galleryShop.ejs', {artList:art});

            client.close();
            });
        });
    });

/*Get with search results */
app.post('/galleryResults', (req, res, next) => {
    var MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://ud:ud@cluster0.szg5vgf.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('luscofusco');
        var artModel = db.collection('artgallery')
            artModel.findOne({ title: req.body.nameArt }, function (err, art) {
                console.log(req.body.nameArt);
                console.log(art);
                    res.render('galleryResults.ejs', {art:art});
                });
            client.close();
        });

});
app.listen(3000,function () {
    console.log("Server is running on port 3000");
});