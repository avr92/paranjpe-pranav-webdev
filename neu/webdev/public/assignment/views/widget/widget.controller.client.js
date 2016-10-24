
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
            vm.widget = w;
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
        vm.website_Id=$routeParams.wgid;
        vm.widget_Id=$routeParams.wgid;
        vm.page_Id=$routeParams.pid;

        function createWidget(newWidgetType){
            var wid={};
            w.widgetType=newWidgetType;
            var newWidget=WidgetService.createWidget(vm.pid,wid);

            if(newWidget){
                $location.url("/user/"+vm.user_Id+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+vm.wgid);
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
        vm.deleteWidget = vm.deleteWidget;


        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

        function updateWidget(newWidget) {
            var res = WidgetService.updateWidget(newWidget);
            if (res) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
            else {
                console.log("error");
            }
        }

        function deleteWidget() {
            var res = WidgetService.deleteWidget(vm.wgid);
            if (res) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
            else {
                console.log("error");
            }
        }
    }
})();