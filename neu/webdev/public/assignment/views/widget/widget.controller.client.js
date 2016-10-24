
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, WidgetService,$routeParams,$sce){
        var vm = this;
        vm.user_Id=$routeParams.uid;
        vm.website_Id=$routeParams.wid;
        vm.page_Id=$routeParams.pid;
        vm.getHTML=getHTML;
        vm.checkUrl=checkUrl;
        vm.editWidget=editWidget;

        function init() {
            //console.log("inside");

            vm.widgets=WidgetService.findWidgetsByPageId(vm.page_Id);
            //vm.console(widgets);
        }
        init();


        function getHTML(text){
            return $sce.trustAsHtml(text);
        }

        function checkUrl(widgetUrl){
            var parts=widgetUrl.split('/');
            var id=parts[parts.length -1];
            url="https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w){

            //console.log(w.widgetType);
            if(w.widgetType === "YOUTUBE" || w.widgetType ==="IMAGE" || w.widgetType==="HEADER")
                $location.url("/user/"+vm.user_Id+"/website/"+vm.website_Id+"/page/"+vm.page_Id+"/widget/"+w._id);
            else{
                $location.url("/user/"+vm.user_Id+"/website/"+vm.website_Id+"/page/"+vm.page_Id+"/widget");
            }
        }
    }


    function NewWidgetController($routeParams,$location,WidgetService){
        var vm = this;
        vm.user_Id=$routeParams.uid;
        vm.website_Id=$routeParams.wid;
        vm.widget_Id=$routeParams.wgid;
        vm.page_Id=$routeParams.pid;
        vm.createYouTubeWid={"widgetType":"YOUTUBE","pageId":vm.page_Id,"width":"","url":""};
        vm.createHeaderWid={"widgetType":"HEADER","text":"","size":4,"pageId":vm.page_Id};
        vm.createImageWid={"widgetType": "IMAGE", "pageId": vm.page_Id, "width": "", "url": ""};
        vm.createWidget=createWidget;

        function createWidget(newWidgetType){
            var wid=[];
            //w.widgetType=newWidgetType;
            var newWidget=WidgetService.createWidget(vm.page_Id,newWidgetType);
            console.log(newWidget);

            if(newWidget){
                console.log("hey");
                $location.url("/user/"+vm.user_Id+"/website/"+vm.website_Id+"/page/"+vm.page_Id+"/widget/"+newWidget._id);
            }
            else{
                console.log("error");
            }
        }

    }

    function EditWidgetController($location, WidgetService,$routeParams) {
        var vm = this;
        vm.user_Id = $routeParams.uid;
        vm.website_Id = $routeParams.wid;
        vm.widget_Id = $routeParams.wgid;
        vm.page_Id = $routeParams.pid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widget_Id);
        }
        init();

        function updateWidget(newWidget) {
            var res = WidgetService.updateWidget(vm.widget_Id, newWidget);
            if (res) {
                $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
            }
            else {
                console.log("error");
            }
        }

        function deleteWidget() {
            console.log("hello");

            var res = WidgetService.deleteWidget(vm.widget_Id);
            //console.log(res);
            if (res) {
                $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
            }
            else {
                console.log("error");
            }
        }
    }
})();