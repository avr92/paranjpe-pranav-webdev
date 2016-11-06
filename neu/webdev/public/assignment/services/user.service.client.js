(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
/*        var users = [
            {username: 'alice', password: 'ewq', _id: 123, firstName: 'Alice', lastName: 'Wonderland'},
            {username: 'bob', password: 'ewq', _id: 234, firstName: 'Bob', lastName: 'Dylan'},
            {username: 'charlie', password: 'ewq', _id: 345, firstName: 'Charlie', lastName: 'Brown'}
        ];*/

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser1: createUser1
        };
        return api;

        function findUserById(userId) {
            // for(var u in users) {
            //     user = users[u];
            //     if(user._id === userId) {
            //         return user;
            //     }
            // }
            // return null;
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            // for(var u in users) {
            //     user = users[u];
            //     if(user.username === username) {
            //         return user;
            //     }
            // }
            // return null;
            var url="/api/user?username="+username;
            return $http.get(url);

        }

        function findUserByCredentials(username, password) {
            // for(var u in users) {
            //     user = users[u];
            //     if(    user.username === username
            //         && user.password === password) {
            //         console.log(user)
            //         return user;
            //     }
            // }
            var url='/api/user?username='+username+'&password='+password
            return $http.get(url)

        }

        function createUser1(user,passwrd) {
            var usr = user;
            usr.username = user.username;
            usr.password = user.passwrd;
            usr.firstName = user.firstName;
            usr.lastName = user.lastName;
            var len=users.length;
            users.push(usr);
            if (len > users.length) {
                return 1;
            }
            return 0;

        }

        function createUser(user) {
            // var usr = user;
            // usr.username = user.username;
            // usr.password = user.password;
            // usr.firstName = user.firstName;
            // usr.lastName = user.lastName;
            // usr._id=Math.round(new Date().getTime() / 100000000);
            // console.log(usr);
            // var len=users.length;
            // users.push(usr);
            // if (len < users.length) {
            //     return usr;
            // }
            // return null;
            var usr = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user", usr);
        }

        function updateUser(userId, user) {
            // flag =0;
            // for(var u in users) {
            //     usr = users[u];
            //     if (usr._id === userId) {
            //         flag=1;
            //         usr.username = user.username;
            //         usr.lastName = user.lastName;
            //         usr.firstName = user.firstName;
            //         usr.password = user.password;
            //     }
            // }
            // if (flag===1)
            //     return 1;
            // return 0;
            console.log("inside update2");
            var url = "/api/user/" + user._id;
            $http.put(url, user);

        }

        function deleteUser(userId) {
            for(var i=0;i<users.length;i++) {
                if (users[i]._id === userId) {
                    users.splice(i , 1);
                    return users;
                }
            }

        }


    }
})();