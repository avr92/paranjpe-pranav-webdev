
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
            //console.log(": "+vm.websiteId+"::"+vm.user_Id);
            //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function(pages){
                    vm.pages = pages;
                    //console.log(vm.pages);
                    console.log("in controler" + vm.pages);
                });

        }
        init();
    }

    function NewPageController($location,$routeParams, PageService) {
        var vm=this;
        vm.user_Id=$routeParams['uid'];
        vm.websiteId=$routeParams['wid'];
        vm.createNewPage=createNewPage;

        // function init() {
        //     var promise = PageService.findWebsitesForUser(vm.user_Id);
        //     promise
        //         .success(function(websites){
        //             vm.websites = websites;
        //         });
        // }
        // init();

        function createNewPage(page){
            if(page!=null) {
                //page._id = Math.round(new Date().getTime() / 10000000000);
                //page.websiteId = vm.websiteId;
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.user_Id + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function(){
                        console.log("error");
                    });
            }
            // var result=PageService.createPage(vm.websiteId,page);
            // if(result){
            //     console.log("Inside");
            //     console.log(vm.user_Id);
            //     console.log(vm.websiteId);
            //     $location.url("/user/"+vm.user_Id+"/website/"+vm.websiteId+"/page");
            // }
            // else {
            //     vm.error="Error";
            // }
        }


    }

    function EditPageController($location, PageService,$routeParams) {
        var vm=this;
        vm.websiteId = $routeParams.wid;
        vm.page_Id = $routeParams.pid;
        vm.user_Id = $routeParams.uid;
        vm.pageDelete=pageDelete;
        vm.pageEdit=pageEdit;

        vm.currentpage = PageService.findPageById(vm.page_Id);
        console.log(vm.currentpage);


        function init() {
            var promise = PageService.findPageById(vm.page_Id);
            promise
                .success(function(page){
                    vm.currentpage = page;
                });
            // var promise = WebsiteService.findWebsitesForUser(vm.user_Id);
            // promise
            //     .success(function(websites){
            //         vm.websites = websites;
            //     });
        }
        init();


        function pageDelete(){
            console.log(vm.page_Id);
            var promise = PageService.deletePage(vm.page_Id);
            promise
                .success(function(res){
                    if(res!='0') {
                        console.log("inside delete");
                        $location.url("/user/" + vm.user_Id + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function(err){
                    console.log("error");
                });
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
