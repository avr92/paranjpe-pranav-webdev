(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

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

        var api = {
            findWidgetsForPage: findWidgetsForPage,
            //findWidgetById: findWidgetById,
            createWidget: createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };
        return api;


        function createWidget(pageId,widget){
            //console.log("inside createpage")
            var createwidget=widget;

                createwidget._id =Math.round(new Date().getTime() / 100000000);
                //widgetType:widget.widgetType,
                //size:widget.size,
                //text:widget.text(),
                createwidget.pageId=pageId;

            widgets.push(createwidget);
            return createwidget;
        }

        function findWidgetById(wid) {
            for(var w in widgets) {
                if(widgets[w]._id == wid) {
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId){
            res=[];
            console.log("in");

            for (var p in widgets) {
                var widget = widgets[p];

                if(widget.pageId.toString() === pageId.toString()) {
                    //console.log("hello");

                    res.push(widget);
                }
            }
            console.log(res);
            return res;
        }

        function updateWidget(widgetId, widget){
            flag =0;
            for (var p in widgets) {
                pg=widgets[p];
                if(widgets._id.toString() === widgetId.toString()) {
                    flag=1;
                    pg.size=widget.size;
                    pg.text=widget.text;
                }
            }
            if (flag===1)
                return 1;
            return 0;

        }

        function deleteWidget(widgetId){
            for(var i=0;i<widgets.length;i++) {
                if (widgets[i]._id.toString() === pageId.toString()) {
                    widgets.splice(i , 1);
                    return 1;
                }
            }
            return 0;

        }

        function findWidgetsForPage(pid) {
            // TODO: iterate over array looking for widgets for the pid
            return widgets;
        }
    }
})();