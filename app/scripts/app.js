
var React = require("react");

//共通で使う変数や関数を管理するjson
var appUsed = {
    //url :  "https://komainukunn.herokuapp.com",
    url :  "http://localhost:5000",
   
    //日付けを変換してくれる
    setDateFormat : function(date){
        if(!date){
            return "";
        }
        var week = [ "日" , "月" , "火" , "水" , "木" , "金" , "土"] ;
        
        var year = new Date(date).getFullYear();
        var month = new Date(date).getMonth()+1;
        var day = new Date(date).getDate();
        var weekNum = new Date(date).getDay();
        
        date = year+"年 "+month+"月 " +day+"日("+week[weekNum]+")";
        return date;
    }
}

require("./mainController.js")(React,appUsed);
require("./account")(React);

