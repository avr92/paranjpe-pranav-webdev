(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, WidgetService, $routeParams, $sce) {
        var vm = this;
        vm.getHTML = getHTML;
        vm.checkUrl = checkUrl;
        vm.editWidget = editWidget

        function init() {
            //console.log("inside");
            vm.user_Id = $routeParams.uid;
            vm.website_Id = $routeParams.wid;
            vm.page_Id = $routeParams.pid;

            WidgetService
                .findWidgetsByPageId(vm.page_Id)
                .success(function (widgets) {
                    vm.widgets = widgets;

                })
                .error(function () {
                    console.log("error");
                });
        }

        init();


        function getHTML(text) {
            //console.log("ppranav");
            return $sce.trustAsHtml(text);
        }

        function checkUrl(widgetUrl) {
            var parts = widgetUrl.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w) {
            //console.log(w.widgetType);
            if (w.type === "YOUTUBE" || w.type === "IMAGE" || w.type === "HEADING"||w.type === "INPUT"||w.type === "HTML")
                $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget/" + w._id);
            else {
                $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
            }
        }
    }


    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        vm.createWidget = createWidget;

        function init() {
            vm.user_Id = $routeParams.uid;
            vm.website_Id = $routeParams.wid;
            vm.page_Id = $routeParams.pid;
            vm.createYouTubeWid = {
                name: "YOUTUBE Widget",
                "type": "YOUTUBE",
                "width": "100%",
                "url": ""
            };
            vm.createHeaderWid = {
                name: "HEADING Widget",
                "type": "HEADING",
                "text": "",
                "size": 4
            };
            vm.createImageWid = {name: "IMAGE Widget", "type": "IMAGE", "width": "", "url": ""};
            vm.createWidgetHTML = {name: "HTML Widget", type: "HTML", text: ""};
            vm.createWidgetTEXT = {
                name: "Text Input Widget",
                type: "INPUT",
                formatted: false,
                rows: 1,
                placeholder: "",
                text: ""
            };
        }

        init();

        function createWidget(newWidgetType) {
            WidgetService
                .createWidget(vm.page_Id, newWidgetType)
                .success(function (newWidgetType) {
                    $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget/" + newWidgetType._id);
                })
                .error(function () {
                    console.log("error");
                });
        }

    }

    function EditWidgetController($location, WidgetService, $routeParams) {
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
                .success(function (wid) {
                    vm.widget = wid;
                })
                .error(function () {
                    console.log("error");
                });
        }

        init();

        function validateWidgetType(widget){
            var failed=false;
            switch(widget.type){
                case "HEADING":
                    if(widget.text ==''||widget.text == null){
                        failed=true
                    }
                    break;
                case "IMAGE":
                    if(widget.url ==''||widget.url == null){
                        failed=true
                    }
                    break;
                case "YOUTUBE":
                    if(widget.url ==''||widget.url == null){
                        failed=true
                    }
                    break;
            }
            return failed;
        }

        function updateWidget(newWidget) {
            //console.log("pp");
            console.log(newWidget.placeholder);
            if(validateWidgetType(newWidget.type)){
                switch(vm.newWidget.type){
                    case "HEADING":
                        vm.error="cannot be blank";
                        break;
                    case "IMAGE":
                        vm.error="cannot be blank";
                        break;
                    case "YOUTUBE":
                        vm.error="cannot be blank";
                        break;
                    default:
                        vm.error="Some unresolved error ";
                        break;
                }
            }
            else
            {
                //console.log("inside else");
                WidgetService
                    .updateWidget(vm.widget_Id, newWidget)
                    .success(function (res) {
                        if (res != '0') {
                            //console.log("/user/" + newWidget.width);
                            $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
                        }
                    })
                    .error(function () {
                        console.log("error");
                    });
            }

        }

        function deleteWidget() {
            console.log("hello");

            var res = WidgetService
                .deleteWidget(vm.widget_Id)
                .success(function (res) {
                    if (res != '0') {
                        $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget");
                    }
                })
                .error(function () {
                    console.log("error");
                });
        }
    }
})();