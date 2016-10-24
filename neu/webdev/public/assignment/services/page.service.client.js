/**
 * Created by paran on 10/20/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages=[
            { "_id": "321", "name": "Post 11", "websiteId": "321", "description": "Lorem" },
            { "_id": "321", "name": "Post 21", "websiteId": "321", "description": "Lorem" },
            { "_id": "321", "name": "Post 31", "websiteId": "321", "description": "Lorem" },
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
        };
        return api;

        function createPage(website_Id, page){
            console.log("inside createpage")
            var createpage= {
                _id :Math.round(new Date().getTime() / 100000000),
                name:page.name,
                description:page.title,
                websiteId:website_Id
            };
            pages.push(createpage);
            return true;
        }

        function findPageByWebsiteId(websiteId){
            res=[];

            for (var p in pages) {
                page = pages[p];
                if(page.websiteId.toString() === websiteId.toString()) {
                    console.log(page);
                    res.push(page);
                }
            }
            return res;
            }

        function findPageById(pageId) {
            for (var p in pages) {
                page = pages[p];
                if(page._id.toString() === pageId.toString()) {
                    return page;
                }
            }
            return null;

        }

        function updatePage(pageId, page) {
            flag =0;
            for (var p in pages) {
                pg = pages[p];
                if(pg._id.toString() === pageId.toString()) {
                    flag = 1;
                    pg.name=page.name;
                    pg.description=page.description;
                    pg.websiteId=page.websiteId;
                    break;
                }
            }
            if (flag===1)
                return 1;
            return 0;
        }

        function deletePage(pageId) {
            for(var i=0;i<pages.length;i++) {
                if (pages[i]._id.toString() === pageId.toString() ) {
                    pages.splice(i , 1);
                    return 1;
                }
            }
            return 0;
        }
    }
})();