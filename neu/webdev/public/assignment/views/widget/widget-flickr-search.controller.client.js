(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,$location,FlickrService,WidgetService){
        var vm=this;
        function init(){
            vm.user_Id=$routeParams['uid'];
            vm.website_Id=$routeParams['wid'];
            vm.page_Id=$routeParams['pid'];
            vm.widget_Id=$routeParams['wgid'];
            WidgetService.findWidgetById(vm.widget_Id)
                .success(function (curwid) {
                    vm.currentwidget = curwid;
                })
                .error(function (error) {
                    vm.error="Error";
                });
        }
        init();
        vm.searchPhotos=function (searchterm) {

            FlickrService
                .searchPhotos(searchterm)
                .then(function (response) {
                    console.log("now in here with valid response::"+response);
                    data=response.data.replace("jsonFlickrApi(", "");
                    data=data.substring(0,data.length-1);
                    data=JSON.parse(data);
                    vm.photos=data.photos;

                },function (error) {
                    vm.error=error;
                });
        };
        //
        // vm.selectPhoto=function (photo) {
        //     var url="https://farm"+photo.farm+".staticflickr.com/"+ photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //     vm.currentwidget.url=url;
        //     WidgetService
        //         .updateWidget(vm.widget_Id,vm.currentwidget)
        //         .then(function (response) {
        //             $location.url("/user"+ vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget/" + vm.widget_Id);
        //         },function (error) {
        //         vm.error="error";
        //     });
        //
        // }

        vm.selectPhoto = function (photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.currentwidget.url = url;

            WidgetService
                .updateWidget(vm.widget_Id, vm.currentwidget)
                .then(function (response) {
                    $location.url("/user/" + vm.user_Id + "/website/" + vm.website_Id + "/page/" + vm.page_Id + "/widget/" + vm.widget_Id);
                }, function (err) {
                    vm.error = "Failed to update widget";
                });
        }
    }
})();