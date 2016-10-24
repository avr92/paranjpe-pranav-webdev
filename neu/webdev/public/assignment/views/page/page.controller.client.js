
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
        vm.pageDelete=pageDelete;
        vm.pageEdit=pageEdit;

        vm.currentpage = PageService.findPageById(vm.page_Id);

        function pageDelete(){

            var result=PageService.deletePage(vm.page_Id);

            if(result==1){
                $location.url("/user/"+vm.user_Id+"/website/"+vm.websiteId+"/page");
            }
            else {
                console.log("Error");
            }
        }

        function pageEdit(){

            var res=PageService.updatePage(vm.page_Id, vm.currentpage);

            if(res)
            {
                console.log(vm.user_Id);
                console.log(vm.websiteId);
                $location.url("/user/"+vm.user_Id+"/website/"+vm.websiteId+"/page");
            }
            else {
                console.log("Error");
            }
        }



    }
})();
