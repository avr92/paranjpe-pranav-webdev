module.exports = function(app,model) {
    // var websites = [
    //     {_id: 321, name: 'facebook.com', uid: 123},
    //     {_id: 432, name: 'wikipedia.org', uid: 123},
    //     {_id: 543, name: 'twitter.com', uid: 234}
    // ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.put('/api/website/:websiteId',updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function deleteWebsite(req,res){
        console.log("inside del23");
        var wid = req.params.websiteId;
        // for(var w in websites) {
        //     if((websites[w]._id).toString() == wid.toString()) {
        //         websites.splice(w, 1);
        //     }
        // }
        // res.send(200);
        model
            .websiteModel
            .deleteWebsite(wid)
            .then(
                function(code){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createWebsite(req, res) {
        var website = req.body;
        //websites.push(website);
        var id=req.params.userId;
        model
            .websiteModel
            .createWebsite(id,website)
            .then(
               function(website){
                   console.log(website);
                   res.send(website);
               },
                function(error){
                   res.sendStatus(400).send(error);
                }
            );
       // res.send(websites);
    }

    function findAllWebsitesForUser(req, res) {
        //console.log("inside find")
        var uid = req.params.userId;
        // var result = [];
        // for(var w in websites) {
        //     if((websites[w].uid).toString() === uid.toString()) {
        //         result.push(websites[w]);
        //     }
        // }
        // res.json(result);
        model
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function (website){
                    res.send(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req,res) {
        //console.log("Inside findbyid");
        var wid= req.params.websiteId;
        // for (var w in websites) {
        //     if ((websites[w]._id).toString() === wid.toString()) {
        //         console.log(websites[w]);
        //         console.log("hello");
        //         res.send(websites[w]) ;
        //     }
        // }
        // res.send('0');
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateWebsite(req,res){
        var user = req.body;
        var wid = req.params.websiteId;
        var website=req.body

        // for (var u in websites) {
        //
        //     if ((websites[u]._id).toString() == wid.toString()) {
        //         websites[u] = user;
        //         res.send(200);
        //     }
        // }
        //
        //  res.send('0');
        model
            .websiteModel
            .updateWebsite(wid,website)
            .then(
                function(code){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


};