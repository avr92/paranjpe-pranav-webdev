(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);
    var key="e8fe36cfbcc668f213a2e8327150bc76"
    var secret="e7858ca99951e7f0"
    var urlBase="https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api={
            searchPhotos:searchPhotos
        };
        return api;
        
        function searchPhotos(searchterm) {
            var url=urlBase
                .replace("API_KEY",key)
                .replace("TEXT",searchterm);
            console.log("valid url:::::"+url);
            return $http.get(url);
        }
    }

})();