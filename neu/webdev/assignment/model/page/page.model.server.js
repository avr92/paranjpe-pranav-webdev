module.exports=function () {
    var model={};
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("pageModel", pageSchema);

    var api = {
        setModel:setModel,
        createPage: createPage,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllPagesForWebsite: findAllPagesForWebsite
    }
    return api;

    function setModel(origmodel){
        model=origmodel;
    }


    function createPage(websiteId,page){
        page._website=websiteId;
        return pageModel.create(page);
    }

    function findPageById(pageId){
        return pageModel.findById(pageId);
    }

    function findAllPagesForWebsite(websiteId){
        return pageModel.find({_website:websiteId});
    }

    function updatePage(pageId,page){
        return pageModel
            .update({_id:pageId},{$set:page});
    }

    function deletePage(pageId){
        return pageModel.remove({_id:pageId});
    }

}