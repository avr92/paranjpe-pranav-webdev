/**
 * Created by paran on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            // var user = UserService.findUserByCredentials(username, password);
            // console.log(user);
            var promise = UserService.findUserByCredentials(username, password);
            console.log(promise);
            promise
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        console.log(user._id);
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (bbbb) {
                    console.log(bbbb);
                });
            /*if(user === null) {
             vm.error = "No such user";
             } else {
             //console.log($location);
             $location.url("/user/" + user._id);
             }*/
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(user) {
            if (vm.user.password !== vm.user.verifypassword) {
                vm.error = "Passwords do not match!!";
            }
            else {

                var promise = UserService.createUser(user);
                promise
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "No such user";
                        } else {
                            console.log(user._id);
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function (bbbb) {
                        console.log(bbbb);
                    });
            }
            // console.log("hello");
            // var user = UserService.createUser(user);
            // console.log(user);
            // if (user ===null) {
            //     vm.error = "Not added"
            // }
            // else {
            //     $location.url("/user/" + user._id);
            // }

        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        //var usrid=parseInt($routeParams.uid);
        // vm.updateprofile=updateprofile;
        //
        // function updateprofile(user){
        //     var finduser=UserService.updateUser(usrid,user);
        //     vm.message ="Successfully updated!";
        // }

        var userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(userId);
        console.log("fdsfv" + userId);
        console.log(user);
        vm.updateprofile = updateprofile;
        vm.unregisterUser = unregisterUser;


        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .success(function (user) {
                    //console.log(user);
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (err) {
                    vm.error = "err";
                });


        }

        init();

        function updateprofile() {
            console.log("inside update");
            UserService.updateUser(userId, vm.user);
        }

        function unregisterUser() {
            UserService
                .unregisterUser(vm.user._id)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }

        /*
         if(user != null) {
         vm.user = user;
         }*/
    }

})();