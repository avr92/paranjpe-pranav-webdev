module.exports = function(app,model) {
    // var pages=[
    //     { "_id": "321", "name": "Post 11", "websiteId": "321", "description": "Lorem" },
    //     { "_id": "3211", "name": "Post 21", "websiteId": "321", "description": "Lorem" },
    //     { "_id": "32121", "name": "Post 31", "websiteId": "321", "description": "Lorem" },
    //     { "_id": "3241", "name": "Post 41", "websiteId": "321", "description": "Lorem" },
    //     { "_id": "31", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function findAllPagesForWebsite(req,res){
        var wid = req.params.websiteId;
        // console.log("wid server"+wid);
        // var result = [];
        // for(var p in pages) {
        //     if((pages[p].websiteId).toString() === wid.toString()) {
        //         result.push(pages[p]);
        //         //console.log("inside");
        //     }
        // }
        // res.json(result);
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (page){
                    res.send(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req,res){
         var pg= req.params.pageId;
        // for (var p in pages) {
        //     if ((pages[p]._id).toString() === pg.toString()) {
        //         console.log(pages[p]);
        //         res.send(pages[p]) ;
        //     }
        // }
        // res.send('0');
        model
            .pageModel
            .findPageById(pg)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }
    function createPage(req,res){
        // console.log("inside createpage")
        // var createpage= {
        //     _id :Math.round(new Date().getTime() / 100000000),
        //     name:page.name,
        //     description:page.title,
        //     websiteId:website_Id
        // };
        // pages.push(createpage);
        // return true;

        var page = req.body;
        var id=req.params.websiteId;
        // pages.push(page);
        // res.send(pages);
        model
            .pageModel
            .createPage(id,page)
            .then(
                function(page){
                    //console.log(website);
                    res.send(page);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }
    function updatePage(req,res){
        var page = req.body;
        var pid = req.params.pageId;
        //var pid = req.params.pageId;

        // for (var p in pages) {
        //     console.log("outside count");
        //
        //     if ((pages[p]._id).toString() == pid.toString() ) {
        //         console.log("count");
        //         pages[p] = page;
        //
        //     }
        // }
        // res.send(200);
        model
            .pageModel
            .updatePage(pid,page)
            .then(
                function(code){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
    function deletePage(req,res){
        //console.log("inside delete:::in");
        var pid = req.params.pageId;
        // for(var p in pages) {
        //     if((pages[p]._id).toString() == pid.toString()) {
        //         console.log("loop inside");
        //         pages.splice(p, 1);
        //     }
        // }
        // res.send(200);
        model
            .pageModel
            .deletePage(pid)
            .then(
                function(code){
                    res.sendStatus(200);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );

    }
};

