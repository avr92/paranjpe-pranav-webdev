(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteNewController", WebsiteNewController)
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.user_Id = parseInt($routeParams['uid']);

        function init() {
            var promise = WebsiteService.findWebsitesForUser(vm.user_Id);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();
    }

    function WebsiteEditController($routeParams,$location, WebsiteService) {
        var vm = this;
        vm.website_Id = parseInt($routeParams.wid);
        vm.user_Id = parseInt($routeParams.uid);
        vm.websiteDelete=websiteDelete;
        vm.websiteEdit=websiteEdit;
        function websiteEdit(website) {

            var promise = WebsiteService.updateWebsite(vm.website_Id, website);
            console.log("newnwe");
            console.log(promise);
            promise.success(function (res) {
                console.log("inside success");
                if (res != '0') {
                    $location.url("/user/" + vm.user_Id + "/website");

                } else {
                    vm.error = "Not Added";
                }
            });
        }

            function websiteDelete(website_Id) {
                var promise = WebsiteService.deleteWebsite(website_Id);
                promise.success(function (res) {
                    if (res != '0') {
                        console.log("inside del");
                        $location.url("/user/" + vm.user_Id + "/website");

                    } else {
                        vm.error = "Not Added";
                    }
                });
            }




        // function websiteEdit(website){
        //     var res=WebsiteService.updateWebsite(vm.website_Id,website);
        //     if (res === 0) {
        //         vm.error = "Not added"
        //     }
        //     else {
        //         console.log("done");
        //         $location.url("/user/"+ vm.user_Id +"/website");
        //     }
        // }
        //
        // function websiteDelete(website_Id) {
        //     var res=WebsiteService.deleteWebsite(website_Id);
        //     console.log(res);
        //     if(res===1)
        //     {
        //         console.log("deleted");
        //         $location.url("/user/" + vm.user_Id+"/website");
        //     }
        //
        // }

        function init() {

            //vm.website = WebsiteService.findWebsiteById(vm.website_Id);
            //console.log(vm.user_Id);
            //vm.websites = WebsiteService.findWebsitesForUser(vm.user_Id);
            var promise = WebsiteService.findWebsiteById(vm.website_Id);
            promise
                .success(function(website){
                    vm.website = website;
                });
            var promise = WebsiteService.findWebsitesForUser(vm.user_Id);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();


    }

    function WebsiteNewController($routeParams, $location, WebsiteService) {

        var vm=this;
        vm.user_Id=($routeParams['uid']);
        vm.websiteCreate = websiteCreate;

        function init() {

            // var promise = WebsiteService.findWebsiteById(vm.website_Id);
            // promise
            //     .success(function(website){
            //         vm.website = website;
            //     });
            var promise = WebsiteService.findWebsitesForUser(vm.user_Id);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();
        function websiteCreate(website) {
            if(website != null){
                website._id = Math.round(new Date().getTime() / 10000000000);
                website.uid = vm.user_Id;
                WebsiteService
                    .createWebsite(vm.user_Id, website)
                    .success(function () {
                        $location.url("/user/"+vm.user_Id+"/website");
                    });
            }

        }
        // function websiteCreate(website){
        //     console.log("inside");
        //     var res=WebsiteService.createWebsite(vm.user_Id, website)
        //     if (res === 0) {
        //         vm.error = "Not added"
        //     }
        //     else {
        //         console.log("done");
        //         $location.url("/user/"+ vm.user_Id +"/website");
        //     }
        // }
    }


})();