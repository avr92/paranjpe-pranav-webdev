module.exports=function () {
    var model={};
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("widgetModel", widgetSchema);

    var api = {
        setModel:setModel,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        reorderWidget:reorderWidget
    }
    return api;

    function setModel(origmodel){
        model=origmodel;
    }

    function reorderWidget(Id,start,end){
        console.log([start,end]);

        return widgetModel
            .find({_page:Id},function(err,widgets){
                widgets.forEach(function (widget){
                    if(start<end) {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    }
                    else{
                        if(widget.order===start){
                            widget.order=end;
                            widget.save();
                        }
                        else if(widget.order<start && widget.order>=end){
                            widget.order=widget.order+1;
                            widget.save();
                        }
                    }
                });
            });
    }

    function createWidget(Id,widget){
        widget._page=Id;
        return widgetModel
            .find({"_page":Id})
            .then(
                function(wid){
                    widget.order=parseInt(wid.length);
                    console.log(widget);
                    return widgetModel.create(widget);
                },
                function(error){
                    //console.log(error);
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(Id){
        return widgetModel.find({_page:Id});
    }

    function findWidgetById(wid){
        return widgetModel.findById(wid);
    }

    function updateWidget(wid,widget){
        return widgetModel
            .update({_id:wid},{$set:widget});
    }

    function deleteWidget(wid){
        return widgetModel.remove({_id:wid});
    }


};