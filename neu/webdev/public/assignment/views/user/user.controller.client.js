/**
 * Created by paran on 10/19/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController",RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                //console.log($location);
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm=this;
        //vm.login = login
        vm.register=register;

        function register(user) {
            console.log("hello");
            var user = UserService.createUser(user);
            console.log(user);
            if (user ===null) {
                vm.error = "Not added"
            }
            else {
                $location.url("/user/" + user._id);
            }
        }


    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var usrid=$routeParams.uid;
        vm.updateprofile=updateprofile;

        function updateprofile(user){
            var finduser=UserService.updateUser(usrid,user);
            vm.message ="Successfully updated!";
        }

        var userId = parseInt($routeParams.uid);

        var user = UserService.findUserById(userId);

        if(user != null) {
            vm.user = user;
        }
    }

})();