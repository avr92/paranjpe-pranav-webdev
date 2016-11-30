module.exports=function () {
    var model={};
    var mongoose=require("mongoose");
    var websiteSchema=require("./website.schema.server")();
    var websiteModel=mongoose.model("websiteModel",websiteSchema);
    var api={
        setModel:setModel,
        createWebsite:createWebsite,
        findWebsiteById:findWebsiteById,
        findAllWebsitesForUser:findAllWebsitesForUser,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite
    }
    return api;

    function setModel(origmodel){
        model=origmodel;
    }

    function createWebsite(userId,website){
        website._user=userId;
        return websiteModel.create(website);
    }

    function findWebsiteById(websiteId){
        return websiteModel.findById(websiteId);
    }

    function findAllWebsitesForUser(userId){
        return websiteModel.find({_user:userId});
    }

    function updateWebsite(websiteId,website){
        return websiteModel
            .update({_id:websiteId},{$set:website});
    }

    function deleteWebsite(websiteId){
        return websiteModel.remove({_id:websiteId});
    }

}