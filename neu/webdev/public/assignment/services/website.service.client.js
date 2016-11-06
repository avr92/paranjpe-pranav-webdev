(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {_id: 321, name: 'facebook.com', developerId: 123, "description": "Lorem"},
        //     {_id: 432, name: 'wikipedia.org', developerId: 123, "description": "Lorem"},
        //     {_id: 543, name: 'twitter.com', developerId: 234, "description": "Lorem"}
        // ];

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function findWebsiteById(wid) {
            // for (var w in websites) {
            //     if (websites[w]._id === wid) {
            //         return websites[w];
            //     }
            // }
            // return null;
            var url = "/api/website/"+wid;
            console.log("pranav"+wid);
            return $http.get(url);
        }

        function findWebsitesForUser(uid) {
            //console.log(uid);
            var url = "/api/user/"+uid+"/website";
            //console.log(url);
            return $http.get(url);
            // var result = [];
            //
            // for (var w in websites) {
            //     if (websites[w].developerId.toString() === uid.toString()) {
            //
            //         result.push(websites[w]);
            //     }
            // }
            //
            // return result;
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for (var w in websites) {
                if (websites[w].developerId === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function createWebsite(userId, website) {
            // var new_website = website;
            // new_website._id = Math.round(new Date().getTime() / 10000000000);
            // new_website.description = website.description;
            // new_website.developerId = userId;
            // new_website.name = website.name;
            // websites.push(new_website);
            // console.log(websites);
            // return 1;
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function updateWebsite(websiteId, website) {
            // flag = 0;
            // for (var u in websites) {
            //     web = websites[u];
            //     if (web._id === websiteId) {
            //         flag = 1;
            //         web.name = website.name;
            //         web.description = website.description;
            //     }
            // }
            // if (flag === 1)
            //     return 1;
            // return 0;
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            // for(var i=0;i<websites.length;i++) {
            //     if (websites[i]._id === websiteId) {
            //         websites.splice(i , 1);
            //         return 1;
            //     }
            // }
            // return 0;
            console.log("inside del1");
            var url = "/api/website/"+websiteId;
            return $http.delete(url);

        }
    }
})();