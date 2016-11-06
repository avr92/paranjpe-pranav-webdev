(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        // var widgets = [
        //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
        //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];

        var api = {
            findWidgetsForPage: findWidgetsForPage,
            //findWidgetById: findWidgetById,
            createWidget: createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            sort:sort
        };
        return api;

        function sort(start,end,pageId){
            var url="/api/page/"+pageId+"/widget?start=START&end=END";
            url=url.replace("START",start)
                .replace("END",end);
            $http.put(url);
        }


        function createWidget(pageId,widget){
            //console.log("inside createpage")
            var createwidget=widget;

                //createwidget._id =Math.round(new Date().getTime() / 100000000);
                //widgetType:widget.widgetType,
                //size:widget.size,
                //text:widget.text(),
                //createwidget.pageId=pageId;

            //widgets.push(createwidget);
            //return createwidget;
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetById(wid) {
            // for(var w in widgets) {
            //     if(widgets[w]._id == wid) {
            //         return widgets[w];
            //     }
            // }
            // return null;
            var url = "/api/widget/"+wid;
            return $http.get(url);
        }

        function findWidgetsByPageId(pageId){
            // res=[];
            // console.log("in");
            //
            // for (var p in widgets) {
            //     var widget = widgets[p];
            //
            //     if(widget.pageId.toString() === pageId.toString()) {
            //         //console.log("hello");
            //
            //         res.push(widget);
            //     }
            // }
            // console.log(res);
            // return res;
            console.log("hell"+pageId);
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            // flag =0;
            // for (var p in widgets) {
            //     pg=widgets[p];
            //     if(pg._id.toString() === widgetId.toString()) {
            //         flag=1;
            //         pg.size=widget.size;
            //         pg.text=widget.text;
            //     }
            // }
            // if (flag===1)
            //     return 1;
            // return 0;
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget);

        }

        function deleteWidget(widgetId){
            // for(var i=0;i<widgets.length;i++) {
            //     if (widgets[i]._id.toString() === widgetId.toString()) {
            //         widgets.splice(i , 1);
            //         return 1;
            //     }
            // }
            // return 0;
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);

        }

        function findWidgetsForPage(pid) {
            // TODO: iterate over array looking for widgets for the pid
            return widgets;
        }
    }
})();