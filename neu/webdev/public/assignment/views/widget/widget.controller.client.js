
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, WidgetService,$routeParams,$sce){
        var vm = this;
        function init() {
            //console.log("inside");
            vm.user_Id=$routeParams.uid;
            vm.website_Id=$routeParams.wid;
            vm.page_Id=$routeParams.pid;
            vm.getHTML=getHTML;
            vm.checkUrl=checkUrl;
            vm.editWidget=editWidget
            WidgetService
                .findWidgetsByPageId(vm.page_Id)
                .success(function(widgets){
                    vm.widgets=widgets;

            })
                .error(function(){
                    console.log("error");
                });
        }
        init();


        function getHTML(text){
            //console.log("ppranav");
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

        vm.createWidget=createWidget;

        function init() {
            //console.log("inside");
            vm.user_Id=$routeParams.uid;
            vm.website_Id=$routeParams.wid;
            vm.widget_Id=$routeParams.wgid;
            vm.page_Id=$routeParams.pid;
            vm.createYouTubeWid={"widgetType":"YOUTUBE","pageId":vm.page_Id,"width":"","url":""};
            vm.createHeaderWid={"widgetType":"HEADER","text":"","size":4,"pageId":vm.page_Id};
            vm.createImageWid={"widgetType": "IMAGE", "pageId": vm.page_Id, "width": "", "url": ""};
        }
        init();

        function createWidget(newWidgetType){
            var wid=[];
            newWidgetType._id =Math.round(new Date().getTime() / 100000000);
            newWidgetType.pageId=vm.page_Id;
            //w.widgetType=newWidgetType;
            WidgetService
                .createWidget(vm.page_Id,newWidgetType)
                .success(function(){
                $location.url("/user/"+vm.user_Id+"/website/"+vm.website_Id+"/page/"+vm.page_Id+"/widget/"+newWidgetType._id);
            })
                .error(function(){
                   console.log("error");
                });
        }

    }

    function EditWidgetController($location, WidgetService,$routeParams) {
        var vm = this;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.user_Id = $routeParams.uid;
            vm.website_Id = $routeParams.wid;
            vm.widget_Id = $routeParams.wgid;
            vm.page_Id = $routeParams.pid;
            WidgetService
                .findWidgetById(vm.widget_Id)
                .success(function(wid){
                    vm.widget=wid;
            })
                .error(function(){
                    console.log("error");
                });
        }
        init();

        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(vm.widget_Id, newWidget)
                .success(function(res){
                if(res!='0')
                {
                    console.log("/user/"+vm.user_Id);
                    $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
                }
            })
                .error(function(){
                    console.log("error");
                });
        }

        function deleteWidget() {
            console.log("hello");

            var res = WidgetService
                .deleteWidget(vm.widget_Id)
                .success(function(res){
                    if(res!='0')
                    {
                        $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
                    }
            })
                .error(function(){
                    console.log("error");
                });
        }
    }
})();