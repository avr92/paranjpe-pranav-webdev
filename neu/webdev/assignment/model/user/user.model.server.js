module.exports=function () {
    var model={};
    var mongoose=require("mongoose");
    var userSchema=require("./user.schema.server")();
    var userModel=mongoose.model("userModel",userSchema);

    var api={
        setModel:setModel,
        createUser:createUser,
        findUserById:findUserById,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findUserByUsername:findUserByUsername,
        findUserByCredential:findUserByCredential
    }
    return api;

    function setModel(origModel){
        model=origModel;
    }

    function findUserByUsername(uname){
        return userModel.find({username:uname});
    }

    function findUserByCredential(uname,pwd){
        return userModel.find({username:uname,password:pwd});
    }

    function deleteUser(userId){
        return userModel
            .remove({_id:userId});
    }

    function updateUser(userId,user){
        return userModel
            .update(
            {
                _id:userId
            },
            {
                $set:user
                //firstName:user.firstName,
                //lastName:user.lastName
            }
        );
    }

    function createUser(user){
        return userModel.create(user);
    }

    function findUserById(userId){
        console.log("Model.Server: " + userId);
        return userModel.findById(userId);
    }
}