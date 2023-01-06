const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const {MongoClient} = require("mongodb");
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

path = require('path');
app.use(express.static(path.join('../app')));

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

app.use('/gallery', (req, res, next) => {
    var MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://ud:ud@cluster0.szg5vgf.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('luscofusco');
        db.collection('artgallery').find({}).toArray(function (findErr, art) {
            if (findErr) throw findErr;
            const filters = req.query;
            const filteredArt = art.filter(art => {
                let isValid = true;
                for (key in filters) {
                    console.log(key, art[key], filters[key]);
                    isValid = isValid && art[key] == filters[key];
                }
                return isValid;

                res.send('gallery.ejs', {artList:filteredArt});
            });
        });
    });
});

app.listen(3000,function () {
    console.log("Server is running on port 3000");
});