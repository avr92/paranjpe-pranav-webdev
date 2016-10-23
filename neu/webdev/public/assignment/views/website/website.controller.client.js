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
            vm.websites = WebsiteService.findWebsitesForUser(vm.user_Id);
            console.log("in controler" + vm.websites);
        }
        init();
    }

    function WebsiteEditController($routeParams,$location, WebsiteService) {
        var vm = this;
        vm.website_Id = parseInt($routeParams.wid);
        vm.user_Id = parseInt($routeParams.uid);
        vm.websiteDelete=websiteDelete;
        vm.websiteEdit=websiteEdit;

        function websiteEdit(website){
            var res=WebsiteService.updateWebsite(vm.website_Id,website);
            if (res === 0) {
                vm.error = "Not added"
            }
            else {
                console.log("done");
                $location.url("/user/"+ vm.user_Id +"/website");
            }
        }

        function websiteDelete(website_Id) {
            var res=WebsiteService.deleteWebsite(website_Id);
            console.log(res);
            if(res===1)
            {
                console.log("deleted");
                $location.url("/user/" + vm.user_Id+"/website");
            }

        }

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.website_Id);
            vm.websites = WebsiteService.findWebsitesForUser(vm.user_Id);
        }
        init();


    }

    function WebsiteNewController($routeParams, $location, WebsiteService) {

        var vm=this;
        vm.user_Id=($routeParams['uid']);
        vm.websiteCreate = websiteCreate;

        function init() {
            console.log(vm.user_Id);
            vm.websites = WebsiteService.findWebsitesForUser(vm.user_Id);
            console.log(vm.websites);
        }
        init();

        function websiteCreate(website){
            console.log("inside");
            var res=WebsiteService.createWebsite(vm.user_Id, website)
            if (res === 0) {
                vm.error = "Not added"
            }
            else {
                console.log("done");
                $location.url("/user/"+ vm.user_Id +"/website");
            }
        }


    }


})();