var express = require('express');
var router = express.Router();

// Get Page Model
var Page = require('../models/page');

/*
* GET all pages
*/
router.get('/', function (req, res) {
    Page.find({}, function (err, pages) {
        if (err) console.log(err);
        res.json(pages);
    });
});

/*
* GET a page
*/
router.get('/:slug', function (req, res) {

    var slug = req.params.slug;

    Page.findOne({ slug: slug }, function (err, page) {
        if (err) console.log(err);
        res.json(page);
    });
});

/*
* POST add page
*/
router.post('/add-page', function (req, res) {

    var title = req.body.title;
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase(); // replace all spaces
                                                                  // w/ "-"
    var content = req.body.content;
    var hasSidebar = req.body.hasSidebar;
    var sidebar = (hasSidebar) ? "yes" : "no";

    Page.findOne({ slug: slug }, function (err, page) {
        if (err) console.log(err);

        if (page) {
            res.json("pageExists");
        } else {
            var page = new Page({
                title: title,
                slug: slug,
                content: content,
                sidebar: sidebar
            });

            page.save(function (err) {
                if (err) console.log(err);
                res.json("ok");
            });
        }
    });
});

/*
* GET edit page
*/
router.get('/edit-page/:id', function (req, res) {

    var id = req.params.id;

    Page.findById(id, function (err, page) {
        if (err) console.log(err);
        res.json(page);
    });
});

/*
* POST edit page
*/
router.post('/edit-page/:id', function (req, res) {

    var id = req.params.id;

    var title = req.body.title;
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var hasSidebar = req.body.hasSidebar;
    var sidebar = (hasSidebar) ? "yes" : "no";

    Page.findOne({ slug: slug, _id: { '$ne': id } }, function (e, p) {
        if (e) console.log(e);
        // you would think that we want the page to exist since
        // editing but by his logic we dont want what were editing
        // the page to, to already exist (i guess it generates a new
        // id if its being edit so it uses that as well to compare -
        // the slug and id must both be the same for there to be an error)

        // im not sure if all thats correct above in the comments but i 
        // know that its there to not allow users to create another page w/ the
        // same slug whether id's are the same or not
        if (p) {
            res.json("pageExists");
        } else {
            Page.findById(id, function (err, page) {
                if (err) console.log(err);

                page.title = title;
                page.slug = slug;
                page.content = content;
                page.sidebar = sidebar;

                page.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json("problem");
                    } else {
                        res.json("ok");
                    }
                });
            });
        }
    });
});

/*
* GET delete page
*/
router.get('/delete-page/:id', function (req, res) {

    var id = req.params.id;

    Page.findByIdAndRemove(id, function (err) {
        if (err) {
            console.log(err);
            res.json("error");
        } else {
            res.json("ok");
        }
    });
});

// Exports
module.exports = router;