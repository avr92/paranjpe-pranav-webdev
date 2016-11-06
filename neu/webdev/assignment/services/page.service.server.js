module.exports = function(app) {
    var pages=[
        { "_id": "321", "name": "Post 11", "websiteId": "321", "description": "Lorem" },
        { "_id": "3211", "name": "Post 21", "websiteId": "321", "description": "Lorem" },
        { "_id": "32121", "name": "Post 31", "websiteId": "321", "description": "Lorem" },
        { "_id": "3241", "name": "Post 41", "websiteId": "321", "description": "Lorem" },
        { "_id": "31", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function findAllPagesForWebsite(req,res){
        var wid = req.params.websiteId;
        console.log("wid server"+wid);
        var result = [];
        for(var p in pages) {
            if((pages[p].websiteId).toString() === wid.toString()) {
                result.push(pages[p]);
                //console.log("inside");
            }
        }
        res.json(result);
    }

    function findPageById(req,res){
         var pg= req.params.pageId;
        for (var p in pages) {
            if ((pages[p]._id).toString() === pg.toString()) {
                console.log(pages[p]);
                res.send(pages[p]) ;
            }
        }
        res.send('0');

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
        pages.push(page);
        res.send(pages);

    }
    function updatePage(req,res){
        var page = req.body;
        var pid = req.params.pageId;
        var pid = req.params.pageId;

        for (var p in pages) {
            console.log("outside count");

            if ((pages[p]._id).toString() == pid.toString() ) {
                console.log("count");
                pages[p] = page;

            }
        }
        res.send(200);
    }
    function deletePage(req,res){
        console.log("inside delete:::in");
        var pid = req.params.pageId;
        for(var p in pages) {
            if((pages[p]._id).toString() == pid.toString()) {
                console.log("loop inside");
                pages.splice(p, 1);
            }
        }
        res.send(200);

    }
};

