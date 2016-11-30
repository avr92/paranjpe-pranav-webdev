module.exports = function(){
    var mongoose = require('mongoose');
    var WidgetSchema=mongoose.Schema({
        _page:{type:mongoose.Schema.ObjectId,ref:"pageModel"},
        type:{type:String,enum:["IMAGE","YOUTUBE","HEADING","HTML","INPUT"]},
        name:{type:String ,required:true},
        text:{type:String},
        placeholder:{type:String},
        description:{type:String},
        url:{type:String},
        width:{type:String},
        height:{type:String},
        rows:{type:Number},
        size:{type:Number},
        class:{type:String},
        icon:{type:String},
        deletable:{type:Boolean},
        formatted:{type:Boolean},
        order:Number,
        dateCreated:{type:Date,default:Date.now()}
    },{collection:"widget"});
    return WidgetSchema;
};