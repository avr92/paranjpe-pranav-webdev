
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($location, PageService,$routeParams) {
        var vm = this;
        //vm.websiteId = parseInt($routeParams['wid']);
        function init() {
            vm.user_Id=$routeParams['uid'];
            vm.websiteId=$routeParams['wid'];
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            console.log("in controler" + vm.pages);
        }
        init();
    }

    function NewPageController($location,$routeParams, PageService) {
        var vm=this;
        vm.user_Id=$routeParams['uid'];
        vm.websiteId=$routeParams['wid'];
        vm.createNewPage=createNewPage;

        function createNewPage(page){
            var result=PageService.createPage(vm.websiteId,page);
            if(result){
                console.log("Inside");
                console.log(vm.user_Id);
                console.log(vm.websiteId);
                $location.url("/user/"+vm.user_Id+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error="Error";
            }
        }


    }

    function EditPageController($location, PageService,$routeParams) {
        var vm=this;
        vm.websiteId = parseInt($routeParams.wid);
        vm.page_Id = parseInt($routeParams.pid)
        vm.user_Id = parseInt($routeParams.uid);
        vm.websiteDelete=pageDelete;
        vm.websiteEdit=pageEdit;

        function pageDelete(page_Id){
            var result=PageService.deletePage(page_Id);
            if(result==1){
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error("Error");
            }
        }

        function pageEdit(page_Id,page){
            var res=PageService.updatePage(page_Id,page);
            if(res)
            {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error="error";
            }
        }



    }
})();
