module.exports = function(app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/widget/:widgetId',updateWidget);
    app.put("/api/page/:pageId/widget",updatelist);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function uploadImage(req, res) {
        console.log("ppprrrranavvvvv");
        var widgetId      = req.body.widgetId;
        var page_Id      = req.body.page_Id;
        var website_Id      = req.body.website_Id;
        var user_Id      = req.body.user_Id;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        for(var w in widgets) {
         if(widgets[w]._id.toString()===widgetId.toString())
         {
             widgets[w].url="/uploads/"+filename;
         }
        }
        console.log([user_Id,website_Id,page_Id,widgetId]);
        var redirectUrl = "/assignment/#user/"+user_Id+"/website/"+website_Id+"/page/"+page_Id+"/widget/"+widgetId;
        console.log(redirectUrl);
        res.redirect(redirectUrl);
    }

    function updatelist(req,res){
        var start=req.query.start;
        var end=req.query.end;
        console.log([start,end]);
        widgets.splice(end,0,widgets.splice(start,1)[0]);
    }
    function findAllWidgetsForPage(req,res){
        var pid = req.params.pageId;
        console.log("wild server"+pid);
        var result = [];
        for(var w in widgets) {
            if((widgets[w].pageId).toString() === pid.toString()) {
                console.log("in"+widgets[w].widgetType);
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req,res){
        console.log("inside findbyid");
        var wid= req.params.widgetId;
        console.log(wid);
        for (var w in widgets) {
            console.log(widgets[w]._id);

            if ((widgets[w]._id).toString() === wid.toString()) {
                console.log("found");
                res.send(widgets[w]) ;
            }
        }
        res.send('0');

    }
    function createWidget(req,res){
        var wid = req.body;
        widgets.push(wid);
        res.send(widgets);

    }
    function updateWidget(req,res){
        var widgt = req.body;
        var wid = req.params.widgetId;
        var pid = req.params.pageId;

        for (var w in widgets) {
            console.log("outside count");

            if ((widgets[w]._id).toString() == wid.toString() ) {
                console.log("count");
                widgets[w] = widgt;

            }
        }
        res.send(200);
    }
    function deleteWidget(req,res){
        //console.log("inside delete:::in");
        var wid = req.params.widgetId;
        for(var w in widgets) {
            if((widgets[w]._id).toString() == wid.toString()) {
                console.log("loop inside");
                widgets.splice(w, 1);
            }
        }
        res.send(200);

    }
};

