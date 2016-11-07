module.exports=function(app){
    var users = [
        {username: 'alice', password: 'ewq', _id: 123, firstName: 'Alice', lastName: 'Wonderland'},
        {username: 'bob', password: 'ewq', _id: 234, firstName: 'Bob', lastName: 'Dylan'},
        {username: 'charlie', password: 'ewq', _id: 345, firstName: 'Charlie', lastName: 'Brown'}
    ];

    app.post('/api/user', createUser);
    app.get('/api/user',findUser);
    app.get('/api/user/:userId',findUserById);
    app.get('/api/user?username=username');
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);


    function findUserById(req,res) {
        var userId=parseInt(req.params.userId);
        for(var u in users) {
            user = users[u];
            if(user._id === userId) {
                console.log("userId");
                res.send(user);
                return;
            }
        }
        res.send('0');
    }

    function findUser(req,res){
        var params=req.params;
        var query=req.query;
        if(query.password && query.username){
            console.log("hello")
            findUserByCredential(req,res);
        }else if(query.username){

            findUserByUsername(req,res);
        }
    }

    function findUserByCredential(req,res){
        var username=req.query.username;
        var password=req.query.password;
        for(var u in users) {
            user = users[u];
            console.log(user);
            if(user.username === username && user.password === password ) {
                console.log("credentials");
                res.send(user);
                return;
            }
        }
        console.log("credentials1");
        res.send('0');
    }

    function findUserByUsername(req,res){
        var username=req.query.username;
        for(var u in users) {
            user = users[u];
            if(user.username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function createUser(req,res){
        var usr = req.body;
        usr._id=Math.round(new Date().getTime() / 100);
        console.log(usr);
        var len=users.length;
        users.push(usr);
        if (len < users.length) {
            res.send(usr);
        }
        res.send('0');
    }

    function updateUser(req, res) {
        console.log("inside update");
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
            }
        }
        res.send(200);
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }


};